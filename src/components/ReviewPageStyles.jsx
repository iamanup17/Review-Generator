import styled, { keyframes, css } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const glowBorder = keyframes`
  0% { border-color: #ff007f; box-shadow: 0 0 8px #ff007f; }
  25% { border-color: #00ffe5; box-shadow: 0 0 8px #00ffe5; }
  50% { border-color: #9d4edd; box-shadow: 0 0 8px #9d4edd; }
  75% { border-color: #fffb00; box-shadow: 0 0 8px #fffb00; }
  100% { border-color: #ff007f; box-shadow: 0 0 8px #ff007f; }
`;

export const loaderAnim = keyframes`
  50%  {box-shadow: 19px 0 0 3px #00ffe5, 38px 0 0 7px #ff007f, 57px 0 0 3px #9d4edd}
  100% {box-shadow: 19px 0 0 0 #00ffe5, 38px 0 0 3px #ff007f, 57px 0 0 7px #9d4edd}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  height: 90vh;
  background: #0d1117;
  color: #e6edf3;

  .google_image {
    width: 100%;
    height: 100px;
    flex-direction: column;
    align-items: start;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  .google_image {
    @media (max-width: 768px) {
      height: 70px;
    }
  }
`;

export const Title = styled.div`
  padding: 0px !important;
  color: #e25822;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  // display: inline-block;
  font-size: 2rem;
  // text-align: start;
  line-height: 1.2;

  background-image: linear-gradient(
    to right top,

    #00cccc,
    #12ebbd,
    #87b6fbff,
    #14f3efff,
    #3af1dfff
  );
  &.tit {
    padding: 0px;
  }
`;

export const ReviewBox = styled.div`
  border: 2px solid #a5c9f3ff;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  margin-bottom: 24px;
  font-size: 16px;
  background: #161b22;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.4s ease-in-out;
  transition: all 0.3s ease;

  position: relative;

  .btns {
    position: absolute;
    top: 6px;
    right: 6px;

    .icon {
      cursor: pointer;

      .edit {
        color: #ed2982ff;
      }
      .refresh {
        color: green;
      }
    }
  }

  .edittext {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .spann {
    font-size: 18px;
  }

  ${(props) =>
    props.loading &&
    css`
      animation: ${glowBorder} 1.5s linear infinite;
    `}

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 16px;

    .spann {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 12px;

    .spann {
      font-size: 16px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 12px 22px;
  background: #21262d;
  color: #e6edf3;
  border: 1px solid #30363d;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.25s ease;
  font-size: 15px;
  font-family: "Poppins", sans-serif;
  border-color: #00ffe5;

  &.post {
    border-color: #169ffbff;
  }

  &.save {
    border: 1px solid #0c5585ff;
  }
  &.cancel {
    border: 1px solid #f53a9aff;
  }

  &:hover {
    background: #2d333b;
    border-color: #00ffe5;
    box-shadow: 0 0 8px #00ffe588;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

export const Loader = styled.div`
  width: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translateX(-38px);
  box-shadow: 19px 0 0 7px #00ffe5, 38px 0 0 3px #ff007f, 57px 0 0 0 #9d4edd;
  animation: ${loaderAnim} 0.6s infinite alternate linear;
`;

export const InfoBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  background: #161b22;
  border: 1px solid #30363d;
  text-align: left;
  max-width: 550px;

  h3 {
    color: #00ffe5;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
    li {
      margin-bottom: 6px;
      color: #e6edf3;
      font-size: 14px;
    }
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke: #007bff;
    transition: stroke 0.3s ease;
  }

  &:hover svg {
    stroke: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 3px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const ResetButton = styled(EditButton)`
  margin-left: 5px;
`;

export const EditTextarea = styled.textarea`
  width: 90%;
  //   min-height: 120px;
  //   height : 20%;
  padding: 4px 20px;
  font-size: 16px;
  color: #e6edf3;
  line-height: 1.6;
  font-family: poppins;
  background: #161b22;
  border: 2px solid #30363d;
  border-radius: 12px;
  resize: none;
  text-align: center;
  pointer-events: auto;
  user-select: text;
  &:focus {
    outline: none;
    border: 2px solid #007bff;
  }

  &::placeholder {
    color: #666666;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 16px;
    min-height: 100px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;

export const EditControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    gap: 8px;
    padding: 2px 6px button {
      width: 100%;
      max-width: 200px;
      padding: 6px 12px;
    }
  }
`;

export const SentimentButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const SentimentButton = styled.button`
  padding: 8px 16px;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;

  ${(props) =>
    props.sentiment === "positive" &&
    css`
      background: ${props.isSelected ? "#28A745" : "transparent"};
      color: ${props.isSelected ? "#FFFFFF" : "#28A745"};
      border: 1px solid #28a745;
      &:hover {
        background: ${props.isSelected ? "#218838" : "rgba(40, 167, 69, 0.1)"};
        border-color: #218838;
      }
    `}

  ${(props) =>
    props.sentiment === "mixed" &&
    css`
      background: ${props.isSelected ? "#FFC107" : "transparent"};
      color: ${props.isSelected ? "#333333" : "#FFC107"};
      border: 1px solid #ffc107;
      &:hover {
        background: ${props.isSelected ? "#e0a800" : "rgba(255, 193, 7, 0.1)"};
        border-color: #e0a800;
      }
    `}

  ${(props) =>
    props.sentiment === "negative" &&
    css`
      background: ${props.isSelected ? "#DC3545" : "transparent"};
      color: ${props.isSelected ? "#FFFFFF" : "#DC3545"};
      border: 1px solid #dc3545;
      &:hover {
        background: ${props.isSelected ? "#c82333" : "rgba(220, 53, 69, 0.1)"};
        border-color: #c82333;
      }
    `}

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

export const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #121414ff;
  color: #e6edf3;
  padding: 15px 20px;
  border: 2px solid #f8195bff;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 1000;
  max-width: 300px;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 10px;
    width: 90%;
  }
`;
