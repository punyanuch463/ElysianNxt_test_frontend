import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export const CopyButton = styled.button`
  margin-left: 10px;
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  background: #444;
  color: white;
  border: none;
  transition: 0.2s;

  &:hover {
    background: #666;
    transform: scale(1.05);
  }
`;

export const CopiedText = styled.span`
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  color: #4caf50;
  animation: ${fadeUp} 0.4s ease forwards;
`;
