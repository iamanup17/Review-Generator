// AnimatedButton.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const moveAlongBorder = keyframes`
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
`;

const ButtonWrapper = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 22px 36px;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
  background: #12172c;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  text-decoration: none;
  cursor: pointer;
  overflow: visible;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);

  span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const MovingDot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00eaff;
  box-shadow: 0 0 8px #00eaff, 0 0 15px #00eaff;
  z-index: 1;

  /* Draw path just slightly inside the border */
  offset-path: path("M 12 12 H 268 A 12 12 0 0 1 280 24 V 60 A 12 12 0 0 1 268 72 H 12 A 12 12 0 0 1 0 60 V 24 A 12 12 0 0 1 12 12 Z");
  offset-rotate: 0deg;
  animation: ${moveAlongBorder} 4s linear infinite;
`;

const AnimatedButton = () => {
  return (
    <ButtonWrapper
      href="https://netconnectglobal.com/automation-rpa-services-and-solutions/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        Octomate – <span style={{ opacity: 0.6 }}>Read more on Automation</span>
      </span>
      <MovingDot />
    </ButtonWrapper>
  );
};

export default AnimatedButton;
