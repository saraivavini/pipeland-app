import {
  model,
  Model,
  prop,
  modelFlow,
  _async,
  _await,
  modelAction,
  getSnapshot,
} from "mobx-keystone";
import { api } from "../../services/api/api";
import utils from "../../utils";
import { load, remove, save } from "../../utils/storage";
import { Session, User } from "./session";

@model("pipeland/SessionsStore")
export class SessionsStore extends Model({
  activeSession: prop<Session | null>(() => null),
  isLoading: prop<boolean>(false),
  errorMessage: prop<string | null>(() => null).withSetter(),
}) {
  @modelFlow
  login = _async(function* (
    this: SessionsStore,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }
  ) {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const session = yield* _await(
        api.login({
          email,
          password,
        })
      );

      this.activeSession = session;

      const token = getSnapshot(session.token);
      const user = getSnapshot(session.user);

      save("@pipeland:token", token);
      save("@pipeland:user", user);
    } catch (error: any) {
      const err = utils.handleResponseError(error);

      this.setErrorMessage(err.message);

      setTimeout(() => {
        this.setErrorMessage("");
      }, 3000);
    } finally {
      this.isLoading = false;
    }
  });

  @modelFlow
  signUp = _async(function* (
    this: SessionsStore,
    {
      name,
      email,
      password,
      role,
    }: {
      name: string;
      email: string;
      password: string;
      role: string;
    }
  ) {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      yield* _await(
        api.signUp({
          email,
          password,
          name,
          role,
        })
      );

      yield* _await(
        this.login({
          email,
          password,
        })
      );
    } catch (error: any) {
      let errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      this.errorMessage = errorMessage;
    } finally {
      this.isLoading = false;
    }
  });

  @modelFlow
  logout = _async(function* (this: SessionsStore) {
    this.isLoading = true;

    this.activeSession = null;

    yield* _await(
      Promise.all([remove("@pipeland:token"), remove("@pipeland:user")])
    );

    this.isLoading = false;
  });

  @modelFlow
  loadSessionInfo = _async(function* (this: SessionsStore) {
    this.isLoading = true;

    const token = yield* _await(load("@pipeland:token"));
    const user = yield* _await(load("@pipeland:user"));

    if (!!token && !!user) {
      this.activeSession = new Session({
        user: new User(user),
        token,
      });

      api.axios.defaults.headers.authorization = `Bearer ${token}`;
    }

    this.isLoading = false;
  });

  @modelAction
  clearErrors = () => {
    this.errorMessage = null;
  };
}
