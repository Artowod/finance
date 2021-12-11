import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
/* import Img from '../../img/dollar.gif'; */

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #ff751d;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
`;

function Loader() {
  return <RingLoader css={override} speedMultiplier={2.5} size={100} color="#ff751d" />;
}

export default Loader;
