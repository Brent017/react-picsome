import React, { useState, useEffect } from "react";
import Photos from "./pages/Photos";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [allPhotos, setAllPhotos] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const url =
    "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json";

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllPhotos(data));
  }, []);

  function toggleFavorite(id) {
    const updatedArr = allPhotos.map(photo => {
      if (photo.id === id) {
        console.log(id);
        console.log(!photo.isFavorite);
        return {
          ...photo,
          isFavorited: !photo.isFavorite
        };
      }
      return photo;
    });

    setAllPhotos(updatedArr);
  }

  function addToCart(newItem) {
    setCartItems(prevItems => [...prevItems, newItem]);
  }

  console.log(cartItems);

  //   console.log(allPhotos);

  return (
    <Context.Provider value={{ allPhotos, toggleFavorite, addToCart }}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
