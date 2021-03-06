import styled from "styled-components/native";
import {
  PipelandSystemStyleProps,
  pipelandSystemStyle,
} from "../pipeland-system";

export const Container = styled.View<PipelandSystemStyleProps>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  border-width: 2px;
  border-color: ${(props) => props.theme.color.line};
  padding: ${(props) => props.theme.spacing[2]}px;
`;
