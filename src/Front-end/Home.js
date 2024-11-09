import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();

  const Name = localStorage.getItem('name');
  const ID = localStorage.getItem('id');
  const Email = localStorage.getItem('email');
  const Phone = localStorage.getItem('phoneno');


  const goToOrders = () => {
    navigate("/order");
  };


  return (
    <StyledWrapper>
      <h1>Welcome, {Name || "User"}!</h1>
      <p>Your email: {Email || "Not provided"}</p>
      <p>Your phone number: {Phone || "Not provided"}</p>
      <p>ID: {ID || "Not provided"}</p>
      <button onClick={goToOrders}>Orders</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  color: white;
`;

export default Home;
