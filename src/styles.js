import styled from "styled-components";

import { createGlobalStyle } from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  font-family: Arial, sans-serif;
`;

export const ReviewBox = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  width: 400px;
  margin-bottom: 20px;
  font-size: 16px;
  background: #f9f9f9;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background: #3367d6;
  }
`;



export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background: #0d1117;
    color: #e6edf3;
  }
`;

