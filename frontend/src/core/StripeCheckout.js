import React from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";
import styled from "styled-components";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const Button = styled.button`
    display: inline-block;
    border-radius: 50px;
    background-color: #1f2833;
    border: solid 2px #66fcf1;
    color: #ffffff;
    text-align: center;
    font-size: 15px;
    padding: 10px;
    width: 75%;
    transition: all 0.5s;
    cursor: pointer;
    margin-top: 10px;
    font-family: "Varela Round", sans-serif;
    &:hover {
      border-color: #ffffff;
    }
  `;
  const tokens = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products && products.map((p) => (amount = amount + p.price));
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const orderData = {
          products: products,
          amount: getFinalAmount(),
        };
        createOrder(userId, tokens, orderData);
        //call further methods here
        cartEmpty(() => {
          console.log("Did we got a crash");
        });
        setReload(!reload);
      })
      .catch((error) => console.log(error));
  };

  const showStripButton = () => {
    // const temp = process.env.STRIPE_PUBKEY;
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51K3znQSGDlZumFGQ2lM6ZOmCxhKrJtHVYgYt99dvsaDSnjLpBsCiuXafVMiZmv8sjf4nKQig8T2LmOXTJCr9F9eQ00SDVr3Sns"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Shopping at Spiffy"
        shippingAddress
        billingAddress
      >
        <Button className="">CHECKOUT</Button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <Button>Signin</Button>
      </Link>
    );
  };

  return (
    <div>
      <h4 className="text-black">Total Amount: ???{getFinalAmount()}</h4>
      {showStripButton()}
    </div>
  );
};

export default StripeCheckout;
