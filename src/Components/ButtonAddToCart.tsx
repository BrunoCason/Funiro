import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Reducers/CartReducer";
import { Product } from "../Mocks/dataProps";

interface ButtonAddToCartProps {
  product: Product;
}

const ButtonAddToCart = ({ product }: ButtonAddToCartProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    let image = "";
    if (product.images.length > 0) {
      image = product.images[0];
    }

    dispatch(
      addToCart({
        id: parseInt(product.id),
        name: product.product_name,
        price: product.price,
        image: image,
        quantity: 1,
      })
    );
  };

  return (
    <button
      className="bg-white text-Primary px-14 py-3 text-center font-poppins font-semibold text-base"
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  );
};

export default ButtonAddToCart;
