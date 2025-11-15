import styled from "@emotion/styled";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 90%; 
    padding: 15px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 10px;
  }
`;
