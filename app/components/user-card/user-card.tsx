import React from "react";

import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";
import { Text } from "../text";

import {
  CardContainer,
  UserInfoContainer,
  GameElementsList,
} from "./user-card.styles";
import { Icon } from "../icon/icon";
import { useStores } from "../../store";
import { observer } from "mobx-react";

import { Container } from "../container";

export const UserCard = observer(() => {
  const { classesStore, sessionsStore } = useStores();

  if (!classesStore.studentInfo) return null;

  return (
    <CardContainer>
      <Container alignItems="center" justifyContent="center">
        <Avatar
          size={80}
          name={sessionsStore.activeSession?.user?.name}
          uri={sessionsStore.activeSession?.user?.photo_url}
        />
      </Container>
      <UserInfoContainer>
        <Container flexDirection="row" alignItems="center" width="100%">
          <Text preset="title" flexShrink={1} numberOfLines={1}>
            {sessionsStore.activeSession?.user?.nickname ||
              sessionsStore.activeSession?.user?.name}
          </Text>
          <Icon
            name={classesStore.studentInfo.current_avatar}
            marginLeft={2}
            size={16}
          />
        </Container>
        <ProgressBar
          marginTop={4}
          currentPoints={classesStore.studentInfo.current_coinst_qty}
          totalPoints={classesStore.selectedClass?.coinsMax || 0}
        />
        <GameElementsList>
          <Container flexDirection="row" alignItems="center">
            <Icon marginRight={2} name="attendanceAnchor" />
            <Text>{classesStore.studentInfo.attendances_count}</Text>
          </Container>
          <Container flexDirection="row" alignItems="center" marginLeft={4}>
            <Icon marginRight={2} name="mushroomUp" />
            <Text>{classesStore.studentInfo.current_mushroom_ups_qty}</Text>
          </Container>
        </GameElementsList>
      </UserInfoContainer>
    </CardContainer>
  );
});
