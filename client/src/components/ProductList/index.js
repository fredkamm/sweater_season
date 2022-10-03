import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SWEATERS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SWEATERS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { useLocation } from 'react-router-dom';

import Auth from '../../utils/auth';

function SweaterList() {
  const [state, dispatch] = useStoreContext();

  const { currentTag } = state;

  const location = useLocation();
  console.log(location);
  
  const { loading, data } = useQuery(QUERY_ALL_SWEATERS);
  
  useEffect(() => {
    if (data) {
      console.log("here", data);
      dispatch({
        type: UPDATE_SWEATERS,
        sweaters: data.sweaters,
      });
      data.sweaters.forEach((sweater) => {
        idbPromise('sweaters', 'put', sweater);
      });
    } else if (!loading) {
      idbPromise('sweaters', 'get').then((sweaters) => {
        dispatch({
          type: UPDATE_SWEATERS,
          sweaters: sweaters,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterSweaters() {
    if (location.pathname !== '/profile') {
      return state.sweaters;
    }

    console.log(Auth.getProfile().data.email)

    return state.sweaters.filter(
      (sweater) => sweater.creator.email === Auth.getProfile().data.email
    );
    // if (!currentTag) {
    //   return state.sweaters;
    // }

    // return state.sweaters.filter(
    //   (sweater) => sweater.tag._id === currentTag
    // );
  }

  return (
    <div className="my-2">
      {state.sweaters.length ? (
        <div className="flex-row">
          {filterSweaters().map((sweater) => (
            <ProductItem
              key={sweater._id}
              _id={sweater._id}
              image={sweater.image}
              name={sweater.name}
              price={sweater.price}
              description={sweater.description}
              creator={sweater.creator.username}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any sweaters yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default SweaterList;
