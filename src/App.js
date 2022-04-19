
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import { books } from "./data"
import Bookinfo from "./Pages/BookInfo";
import Cart from "./Pages/Cart";
import React, { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([])



  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }])
  }

  function numberOfItems(){
    let counter  = 0
    cart.forEach(item => {
      counter += item.quantity 
    })
    return counter
  }

  function changeQuantity(book, quantity) {
    setCart(cart.map(item => {
      if (item.id === book.id) {
        return {
          ...item,
          quantity: +quantity
        }
      } else {
        return item
      }
    }))
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<Bookinfo books={books} addToCart={addToCart} cart={cart} />} />
          <Route path="/cart" element={<Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
