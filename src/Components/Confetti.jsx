import React from "react";
import useWindowSize from "../Hooks/useWindowSize";
import Confetti from "react-confetti";

export default () => {
  const { width, height } = useWindowSize();
  return <Confetti initialVelocityX={50} initialVelocityY={10} width={width} height={height} />;
};
