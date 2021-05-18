import React from "react";
//styles
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <p>Copyright &copy; 2021 Hossein Darparish</p>
    </FooterStyled>
  );
};

const FooterStyled = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  bottom: 0;
  /*   top: 40%;
  left: 50%;
  transform: translate(-50%, -50%); 

  transform: translate(100%, 0%);*/
`;

export default Footer;
