import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import expenceJson from '../../../data/expenselcon.json';
import incomesJson from '../../../data/expenselcon.json';
import { MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';

const StyledInputElement = styled('input')`
  max-width: 300px;
  height: 37px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  border: 2px solid #f5f6fb;
  border-radius: 16px 0px 0px 0px;
  padding: 6px 10px;
  color: #20262d;
  margin: 0;
  transition: width 300ms ease;
  position: relative;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    width: 282px;
    background: #f5f6fb;
    border: 2px solid #ffffff;
    border-bottom: none;
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    background: inherit;
  }

  &:focus {
    outline: none;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref}></InputUnstyled>
  );
});
export default CustomInput;
