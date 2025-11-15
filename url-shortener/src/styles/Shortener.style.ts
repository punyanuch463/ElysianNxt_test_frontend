import styled from "@emotion/styled";

export const Container = styled.div`
  // max-width: 600px;
  // margin: 60px auto;
  // text-align: center;
   width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 10px;
`;



export const Input = styled.input`
  padding: 14px;
  border: 2px solid #ddd;
  width: 100%;
  border-radius: 8px;
  font-size: 18px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 14px 30px;
  background: #222;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
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
