import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_TAGS,
  UPDATE_CURRENT_TAG,
} from '../../utils/actions';
import { QUERY_TAGS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function TagMenu() {
  const [state, dispatch] = useStoreContext();

  const { tags } = state;

  const { loading, data: tagData } = useQuery(QUERY_TAGS);

  useEffect(() => {
    if (tagData) {
      dispatch({
        type: UPDATE_TAGS,
        tags: tagData.tags,
      });
      tagData.tags.forEach((tag) => {
        idbPromise('tags', 'put', tag);
      });
    } else if (!loading) {
      idbPromise('tags', 'get').then((tags) => {
        dispatch({
          type: UPDATE_TAGS,
          tags: tags,
        });
      });
    }
  }, [tagData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_TAG,
      currentTag: id,
    });
  };

  return (
    <div>
      <h2>Choose a Tag:</h2>
      {tags.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default TagMenu;
