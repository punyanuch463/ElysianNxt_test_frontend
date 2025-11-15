import styled from "@emotion/styled";

export const HistoryContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  color: white;
`;

export const ToggleButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const HistoryList = styled.div<{ open: boolean }>`
  max-height: ${({ open }) => (open ? "300px" : "0")};
  overflow-y: auto;
  transition: max-height 0.3s ease-in-out;
  width: 100%;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: ${({ open }) => (open ? "10px" : "0 10px")};
  box-sizing: border-box;
`;

export const HistoryItem = styled.div`
  font-size: 12px;
  padding: 6px 0;
  border-bottom: 1px solid #333;
  word-break: break-all; /* ทำให้ URL ยาว wrap */
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #2a2a2a;
  }
`;
