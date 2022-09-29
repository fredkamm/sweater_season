import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, description } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    // if (itemInCart) {
    //   dispatch({
    //     type: UPDATE_CART_QUANTITY,
    //     _id: _id,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });
    //   idbPromise("cart", "put", {
    //     ...itemInCart,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });
    // } else {
      dispatch({
        type: ADD_TO_CART,
        sweater: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    // }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Link to={`/sweaters/${_id}`}>
        <Card.Img variant="top" src={`/images/${image}`} />
      </Link>
      <Card.Body>
        <Card.Title>Card Title {name} </Card.Title>
        <Card.Text>
          <div>
            <div>
              {description}
            </div>
            <span>${price}</span>
          </div>
        </Card.Text>
        <Button variant="primary" onClick={addToCart}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;