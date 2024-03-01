import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";
  const wishlistEndPoint = "https://ecommerce.routemisr.com/api/v1/wishlist";
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [idsFromWishlist, setIdsFromWishlist] = useState([]);

  const [cartId, setCartId] = useState(null);
  const headers = {
    token: localStorage.getItem("token"),
  };

  async function addToCart(productId) {
    try {
      let { data } = await axios.post(
        endPoint,
        { productId },
        {
          headers,
        }
      );
      setNumOfCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(
        wishlistEndPoint,
        { productId },
        { headers }
      );
      setNumOfWishlistItems(data.data.length);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCart() {
    try {
      let { data } = await axios.get(endPoint, {
        headers: { token: localStorage.getItem("token") },
      });
      setNumOfCartItems(data.numOfCartItems);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      // console.log(error);
      setNumOfCartItems(0);
    }
  }

  async function getWishlist() {
    try {
      let { data } = await axios.get(wishlistEndPoint, {
        headers: { token: localStorage.getItem("token") },
      });
      setNumOfWishlistItems(data.count);
      setIdsFromWishlist(data.data);
      return data;
    } catch (error) {
      // console.log(error);
    }
  }

  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(`${endPoint}/${productId}`, {
        headers,
      });
      setNumOfCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const { data } = await axios.delete(`${wishlistEndPoint}/${productId}`, {
        headers,
      });
      setNumOfWishlistItems(data.data.length);
      setIdsFromWishlist(data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(`${endPoint}`, {
        headers,
      });
      setNumOfCartItems(0);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateQty(productId, count) {
    try {
      const { data } = await axios.put(
        `${endPoint}/${productId}`,
        { count },
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <CartContext.Provider
        value={{
          numOfCartItems,
          cartId,
          addToCart,
          getCart,
          removeFromCart,
          clearCart,
          updateQty,
          setNumOfCartItems,
          addToWishlist,
          numOfWishlistItems,
          getWishlist,
          removeFromWishlist,
          idsFromWishlist,
          setIdsFromWishlist,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
