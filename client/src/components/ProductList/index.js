import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SWEATERS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SWEATERS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function SweaterList() {
  const [state, dispatch] = useStoreContext();

  const { currentTag } = state;

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
    if (!currentTag) {
      return state.sweaters;
    }

    return state.sweaters.filter(
      (sweater) => sweater.tag._id === currentTag
    );
  }

  return (
    <div className="my-2">
      <h2>Our Sweaters:</h2>
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
