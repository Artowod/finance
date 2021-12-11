import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';

const StyledInputCalc = styled('input')`
  max-width: 126px;
  height: 37px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  border: 2px solid #f5f6fb;
  border-radius: 0px 10px 10px 0px;
  padding: 6px 10px;
  color: #20262d;
  margine: 0;
  position: relative;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    border-radius: 16px;
  }

  &:hover {
  }

  &:focus {
    outline: none;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputCalc }} {...props} ref={ref}></InputUnstyled>
  );
});
export default StyledInputCalc;
