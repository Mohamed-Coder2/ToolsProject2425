import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

//Home Page to display the Name and Email after a successful login

const Home = () => {
  const location = useLocation();
  const { username, email } = location.state || {};

  return (
    <StyledWrapper>
      <h1>Welcome, {username || "User"}!</h1>
      <p>Your email: {email || "Not provided"}</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: white;
`;

export default Home;
