/* Modal.style.js */
import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* ทำให้มองเห็น overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* ต้องสูงพอ */
`;

export const ModalContent = styled.div`
  background: #1c1c1c; 
  color: #ffffff;       
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
`;


export const ModalButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  cursor: pointer;
`;
