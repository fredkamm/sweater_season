import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART } from '../../utils/actions';
import './style.css';
import dotenv from 'dotenv';
import CloseButton from 'react-bootstrap/CloseButton';
dotenv.config();

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_51LnkLHLNSMmSC34MhAnU5jjgtfttWaKzyAhHtegkzRFaPzFpuhzMdtitjOTzYZFD5hPvqZsnkX4CISnADbFRuNPs00E4DATg8q');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data, error}] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    console.log(data);
    console.log("HELLO", error);
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
  // // If so, invoke the getCart method and populate the cart with the existing from the session
  // useEffect(() => {
  //   async function getCart() {
  //     const cart = await idbPromise('cart', 'get');
  //     dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
  //   }

  //   if (!state.cart.length) {
  //     getCart();
  //   }
  // }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // When the submit checkout method is invoked, loop through each item in the cart
  // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
  function submitCheckout() {
    const sweaterIds = [];
      console.log("1");
    state.cart.forEach((item) => {
      console.log(item);
      for (let i = 0; i < item.purchaseQuantity; i++) {
        sweaterIds.push(item._id);
      }
    });
    console.log("2");
    console.log(sweaterIds);
    getCheckout({
      variables: { sweaters: sweaterIds },
    });
    console.log("3");
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <img style={{ width: 35, height: 30 }} src="https://user-images.githubusercontent.com/108953743/193062101-f7d7ab85-d08b-40c0-b809-bdb50339a14e.png" aria-label="trash"></img>
      </div>
    );
  }

  return (
    <div className="cart">
      < CloseButton className="close" onClick={toggleCart}/>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {/* Check to see if the user is logged in. If so render a button to check out */}
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
