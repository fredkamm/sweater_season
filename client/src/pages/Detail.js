import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  ADD_TO_CART,
  UPDATE_SWEATERS,
} from '../utils/actions';
import { QUERY_SWEATERS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentSweater, setCurrentSweater] = useState({});

  const { loading, data } = useQuery(QUERY_SWEATERS);

  const { sweaters, cart } = state;

  useEffect(() => {
    // already in global store
    if (sweaters.length) {
      setCurrentSweater(sweaters.find((sweater) => sweater._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_SWEATERS,
        sweaters: data.sweaters,
      });

      data.sweaters.forEach((sweater) => {
        idbPromise('sweaters', 'put', sweater);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('sweaters', 'get').then((indexedSweaters) => {
        dispatch({
          type: UPDATE_SWEATERS,
          sweaters: indexedSweaters,
        });
      });
    }
  }, [sweaters, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
    //   dispatch({
    //     type: UPDATE_CART_QUANTITY,
    //     _id: id,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });
    //   idbPromise('cart', 'put', {
    //     ...itemInCart,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });
    } 
    // else {
      dispatch({
        type: ADD_TO_CART,
        sweater: { ...currentSweater, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentSweater, purchaseQuantity: 1 });
    // }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentSweater._id,
    });

    idbPromise('cart', 'delete', { ...currentSweater });
  };

  return (
    <>
      {currentSweater && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Sweaters</Link>

          <h2>{currentSweater.name}</h2>

          <p>{currentSweater.description}</p>

          <p>
            <strong>Price:</strong>${currentSweater.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentSweater._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentSweater.image}`}
            alt={currentSweater.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
