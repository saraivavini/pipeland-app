import React from "react";
import { StatusLabelProps } from "./status-label.props";
import { Text } from "../text";

import { Container } from "./status-label.styles";

const labelTypes: {
  [key: string]: {
    text: string;
    color: string;
  };
} = {
  CORRECTED: {
    text: "corrigida",
    color: "",
  },
  OPEN: {
    text: "aberta",
    color: "",
  },
  CLOSED: {
    text: "encerrada",
    color: "",
  },
};

export const StatusLabel: React.FC<StatusLabelProps> = ({
  type,
  marginBottom = 0,
  marginRight = 0,
  marginLeft = 0,
  marginTop = 0,
}) => {
  const overrideStyle = {
    marginBottom,
    marginRight,
    marginLeft,
    marginTop,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1,
  };

  return (
    <Container customStyle={overrideStyle}>
      <Text fontSize={12} textTransform="uppercase">
        {labelTypes[type || "OPEN"].text}
      </Text>
    </Container>
  );
};
