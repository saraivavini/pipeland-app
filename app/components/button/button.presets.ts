import { css } from "styled-components/native";

const BASE_BUTTON = css`
  padding-horizontal: ${(props) => props.theme.spacing[2]}px;
  padding-vertical: ${(props) => props.theme.spacing[3]}px;

  border-radius: 4px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const BASE_TEXT = css`
  font-size: 16px;
`;

export const buttonPresets = {
  primary: css`
    ${BASE_BUTTON}

    background-color: ${(props) => props.theme.color.primary};
  `,

  secondary: css`
    ${BASE_BUTTON}
  `,

  link: css`
    ${BASE_BUTTON}
    align-items: center;
    justify-content: flex-start;
    padding-horizontal: ${(props) => props.theme.spacing[0]};
    padding-vertical: ${(props) => props.theme.spacing[4]}px;
  `,
};

export const textPresets = {
  primary: css`
    ${BASE_TEXT}

    color: ${(props) => props.theme.color.background};
    font-weight: bold;
  `,
  secondary: css`
    ${BASE_TEXT}
  `,

  link: css`
    ${BASE_TEXT}
    margin-horizontal: ${(props) => props.theme.spacing[4]}px;
    color: ${(props) => props.theme.color.text};
  `,
};

export type ButtonPresets = keyof typeof buttonPresets;
