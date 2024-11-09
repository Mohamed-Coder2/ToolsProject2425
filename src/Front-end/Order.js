import React, { useState } from 'react';
import styled from "styled-components";

const Order = () => {
  const [formData, setFormData] = useState({
    orderID: '',
    orderDetails: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
    dropoffTime: '',
    userId: ''
  });

  // Get user info from localStorage (logged-in user data)
  const ID = localStorage.getItem('id');  // Get userId (uid) from localStorage

  // Set userId when component is mounted (for formData)
  React.useEffect(() => {
    setFormData((prevDetails) => ({
      ...prevDetails,
      userId: ID,  // Set userId from localStorage
    }));
  }, [ID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to create the order
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,  // Include userId in the request
          orderDetails: formData.orderDetails,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          pickupTime: formData.pickupTime,
          dropoffTime: formData.dropoffTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully created order
        alert('Order created successfully!');
      } else {
        // Handle API error
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      // Handle network or other errors
      alert('An error occurred while submitting the order');
    }
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="form flex w-full items-center justify-center">
          <div className="w-1/4">
            <input
              className="input"
              name="orderDetails"
              placeholder="Order Details"
              required
              type="text"
              value={formData.orderDetails}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="pickupLocation"
              placeholder="Pick-Up Location"
              required
              type="text"
              value={formData.pickupLocation}
              onChange={handleChange}
            />
            <span className="input-border" />
          </div>
          <div className="w-1/4">
            <input
              className="input"
              name="dropoffLocation"
              placeholder="Drop-off Location"
              required
              type="text"
              value={formData.dropoffLocation}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="pickupTime"
              placeholder="Pick-up Time"
              required
              type="date"
              value={formData.pickupTime}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="dropoffTime"
              placeholder="Drop-off Time"
              required
              type="date"
              value={formData.dropoffTime}
              onChange={handleChange}
            />
            <span className="input-border" />
          </div>
        </div>
        <button type="submit" className="submit-button">Submit Order</button>
        <a href='/orders' className='text-white'>My Orders</a>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    --width-of-input: 200px;
    --border-height: 1px;
    --border-before-color: rgba(221, 221, 221, 0.39);
    --border-after-color: #5891ff;
    --input-hovered-color: #4985e01f;
  }
  /* styling of Input */
  .input {
    color: #fff;
    font-size: 0.9rem;
    background-color: transparent;
    width: 90%;
    box-sizing: border-box;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
    border-bottom: var(--border-height) solid var(--border-before-color);
  }
  /* styling of animated border */
  .input-border {
    position: absolute;
    background: var(--border-after-color);
    width: 0%;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: 0.3s;
  }
  /* Hover on Input */
  input:hover {
    background: var(--input-hovered-color);
  }
  input:focus {
    outline: none;
  }
  /* here is code of animated border */
  input:focus ~ .input-border {
    width: 80%;
  }
  .submit-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #5891ff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .submit-button:hover {
    background-color: #3a70cc;
  }
`;

export default Order;
