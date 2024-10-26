import React from "react";
import styled from "styled-components";

const SignUP = () => {

  const [Username, SetUsername] = React.useState();
  const [Email, SetEmail] = React.useState();
  const [Password, SetPassword] = React.useState();
  const [Message, SetMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: Username,
          email: Email,
          password: Password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await response.json();
      console.log('User registered:', data);
      SetMessage('Registration Successful!');
    }
    catch (error) 
    {
      console.error('Error:', error.message);
      SetMessage(error.message);
    }
  };

  return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input 
              type="text" 
              className="input" 
              placeholder="Full Name" 
              onChange={(e) => SetUsername(e.target.value)} 
            />
            <input 
              type="email" 
              className="input" 
              placeholder="Email" 
              onChange={(e) => SetEmail(e.target.value)} 
            />
            <input 
              type="password" 
              className="input" 
              placeholder="Password" 
              onChange={(e) => SetPassword(e.target.value)} 
            />
          </div>
          <button type="submit">Sign up</button> {/*BUTTON IS HERE*/}
        </form>
        {Message && <div className="feedback-message">{Message}</div>}
        <div className="form-section">
          <p>
            Have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-box {
  max-width: 300px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}

/*Form text*/
.title {
  font-weight: bold;
  font-size: 1.6rem;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

/*Inputs box*/
.form-container {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 .5rem;
  width: 100%;
}

.input {
  background: none;
  border: 0;
  outline: 0;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: .9rem;
  padding: 8px 15px;
}

.form-section {
  padding: 16px;
  font-size: .85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.form-section a {
  font-weight: bold;
  color: #0066ff;
  transition: color .3s ease;
}

.form-section a:hover {
  color: #005ce6;
  text-decoration: underline;
}

/*Button*/
.form button {
  background-color: Blue;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s ease;
}

.form button:hover {
  background-color: #005ce6;
}

.feedback-message {
  margin-top: 10px;
  font-size: 1rem;
  color: green; /* Default to green for success */
}

.feedback-message.error {
  color: red; /* Use red for error messages */
}

`;

export default SignUP;
