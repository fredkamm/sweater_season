import { useReducer } from "react";
import {
  UPDATE_SWEATERS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_TAGS,
  UPDATE_CURRENT_TAG,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SWEATERS:
      return {
        ...state,
        sweaters: [...action.sweaters],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.sweater],
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(sweater => {
        return sweater._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case UPDATE_TAGS:
      return {
        ...state,
        tags: [...action.tags],
      };

    case UPDATE_CURRENT_TAG:
      return {
        ...state,
        currentTag: action.currentTag
      }

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}
