import styled from "@emotion/styled";

export const Container = styled.div`

   width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 10px;
`;



export const Input = styled.input`
  padding: 14px 16px;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  transition: 0.2s;
  outline: none;

  &:focus {
    border-color: #555;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
`;

export const Button = styled.button`
   border-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    background: #333;
  }

  svg {
    margin-right: 8px;
  }
`;

export const ResultText = styled.p`
  margin-top: 20px;
  font-size: 20px;

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  a:hover {
    color: #535bf2;
  }

`;
