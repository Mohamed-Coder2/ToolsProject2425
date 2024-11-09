import React, { useState } from 'react';
import styled from "styled-components";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState({
    package_id: '',
    sender_name: '',
    shipping_method: '',
    sender_address: '',
    tracking_number: '',
    package_weight: 0,
    description_of_contents: '',
    delivery_time: '',
    receiver_name: '',
    shipping_date: '',
    receiver_address: '',
    routing_number: '',
    package_dimensions: '',
    declared_value: 0.0,
    additional_notes: '',
    uid: ''
  });

  // Get user info from localStorage (logged-in user data)
  const ID = localStorage.getItem('id');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uid = localStorage.getItem('uid'); // Assuming uid is stored as uid in local storage

    try {
        const response = await fetch('http://localhost:5000/api/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ ...orderDetails, uid })
        });

        if (response.ok) {
            console.log("Order created successfully");
        } else {
            console.error("Failed to create order");
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="form flex w-full items-center justify-center">
          <div className="w-1/4">
            <input
              className="input"
              name="package_id"
              placeholder="Package ID"
              required
              type="text"
              value={orderDetails.package_id}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="sender_name"
              placeholder="Sender Name"
              required
              type="text"
              value={orderDetails.sender_name}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="shipping_method"
              placeholder="Shipping Method"
              required
              type="text"
              value={orderDetails.shipping_method}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="sender_address"
              placeholder="Sender Address"
              required
              type="text"
              value={orderDetails.sender_address}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="tracking_number"
              placeholder="Tracking Number"
              required
              type="text"
              value={orderDetails.tracking_number}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="package_weight"
              placeholder="Package Weight"
              required
              type="number"
              step="0.01"
              value={orderDetails.package_weight}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="description_of_contents"
              placeholder="Description of Contents"
              required
              type="text"
              value={orderDetails.description_of_contents}
              onChange={handleChange}
            />
            <span className="input-border" />
          </div>
          <div className="w-1/4">
            <input
              className="input"
              name="delivery_time"
              placeholder="Delivery Time"
              required
              type="date"
              value={orderDetails.delivery_time}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="receiver_name"
              placeholder="Receiver Name"
              required
              type="text"
              value={orderDetails.receiver_name}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="shipping_date"
              placeholder="Shipping Date"
              required
              type="date"
              value={orderDetails.shipping_date}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="receiver_address"
              placeholder="Receiver Address"
              required
              type="text"
              value={orderDetails.receiver_address}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="routing_number"
              placeholder="Routing Number"
              required
              type="text"
              value={orderDetails.routing_number}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="package_dimensions"
              placeholder="Package Dimensions"
              required
              type="text"
              value={orderDetails.package_dimensions}
              onChange={handleChange}
            />
            <span className="input-border" />
            <input
              className="input"
              name="declared_value"
              placeholder="Declared Value"
              required
              type="number"
              step="0.01"
              value={orderDetails.declared_value}
              onChange={handleChange}
            />
            <span className="input-border" />
          </div>
        </div>
        <div className="w-1/2">
          <input
            className="w-full text-center bg-transparent pt-12 text-white"
            name="additional_notes"
            placeholder="Additional Notes"
            required
            type="text"
            value={orderDetails.additional_notes}
            onChange={handleChange}
          />
          <span className="input-border" />
        </div>
        <button type="submit" className="submit-button">Submit Order</button>
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
