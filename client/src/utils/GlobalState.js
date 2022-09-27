<<<<<<< HEAD
// TODO: Add a comment briefly describing the functionality of `useContext`
// Your comment here

import React, { createContext, useContext } from 'react';

// TODO: Add a comment describing the React hook that `useProductReducer` makes use of
// Your comment here

import { useProductReducer } from './reducers';

// TODO: Add a comment briefly describing what `createContext` does and what it returns
// Your comment here

const StoreContext = createContext();

=======
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'

const StoreContext = createContext();
>>>>>>> 90f1e5b77fd37f3a3d29e2931bd997433a3d76e5
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

<<<<<<< HEAD
  // TODO: Add a comment explaining why we passed a `value` attribute to the `Provider`
  // Your comment here
  return <Provider value={[state, dispatch]} {...props} />;
};

// TODO: Add a comment describing the purpose of our custom `useStoreContext` hook
// Your comment here
=======
  return <Provider value={[state, dispatch]} {...props} />;
};

>>>>>>> 90f1e5b77fd37f3a3d29e2931bd997433a3d76e5
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
