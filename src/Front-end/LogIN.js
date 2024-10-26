import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, SetEmail] = React.useState('');
  const [Password, SetPassword] = React.useState('');
  const navigate = useNavigate();

  //Handle method for submitting User Data
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: Email, password: Password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { username } = data;
        navigate('/home', { state: { username, email: Email } });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <form className="form" onSubmit={handleLogin}>
          <span className="title">Log in</span>
          <span className="subtitle">
            Log into your account with your email.
          </span>
          <div className="input-group">
            <input 
              type="text"
              name="email" 
              id="email" 
              placeholder="Email"
              onChange={(e) => SetEmail(e.target.value)}  
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => SetPassword(e.target.value)}
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button type="submit" className="sign">Log in</button>
        </form>
        <p className="signup pt-4">
          Don&apos;t have an account?
          <a rel="noopener noreferrer" href="/signup" className="text-black">
            Sign up
          </a>
        </p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
.form-container {
  width: 300px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
}

.title {
  font-weight: bold;
  font-size: 1.6rem;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}

.input-group {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 .5rem;
  width: 100%;
}

.input-group label {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
}

.input-group input {
  background: none;
  border: 0;
  outline: 0;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: .9rem;
  padding: 8px 15px;
}

.input-group input:focus {
  padding: 16px;
  font-size: .85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.forgot {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175,1);
  margin: 8px 0 14px 0;
}

.forgot a,.signup a {
  color: rgba(243, 244, 246, 1);
  text-decoration: none;
  font-size: 14px;
}

.sign {
  background-color: green;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s ease;
}

.line {
  height: 1px;
  flex: 1 1 0%;
  background-color: rgba(55, 65, 81, 1);
}

.signup a {
  font-weight: bold;
  color: #0066ff;
  transition: color .3s ease;
}

.signup a:hover {
  color: #005ce6;
  text-decoration: underline;
}

.signup {
  padding: 16px;
  font-size: .85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.forgot{
  color: #005ce6;
  text-decoration: underline;
}

.forgot a{
  color: #005ce6;
  text-decoration: underline;
}

`;

export default Login;
