import styled, { css } from 'styled-components';

export const COLORS = {
  SUB_COLOR: 'grey',
  MAIN_COLOR: 'black'
};

export const ShrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${COLORS.MAIN_COLOR};
`;

export const FormInputLabel = styled.label`
  color: ${COLORS.SUB_COLOR};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ shrink }) => {
    if (shrink) {
      return ShrinkLabelStyles;
    }
  }}
`;

export const PasswordInput = styled.input.attrs({ type: 'password' })`
  letter-spacing: 0.3em;
`;

export const FormInputItem = styled.input`
  background: none;
  background-color: white;
  color: ${COLORS.SUB_COLOR};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${COLORS.SUB_COLOR};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    top: -14px;
    font-size: 12px;
    color: ${COLORS.MAIN_COLOR};
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;
`;
