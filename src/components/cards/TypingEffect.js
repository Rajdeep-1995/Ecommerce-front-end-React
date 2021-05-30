import React from "react";
import Typewriter from "typewriter-effect";

const TypingEffect = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default TypingEffect;
