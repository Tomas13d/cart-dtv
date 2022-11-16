import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import CartOffcanvas from "../CartOffcanvas/cartOffcanvas";
import MenuOffcanvas from "../menuOffcanvas/menuOffcanvas";
import "./navbar.css";

function NavBar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="navbar-style">
      {/* Categories and navbar Icon */}
      <i class="bi bi-list icons" onClick={() => setShowCategories(true)}></i>
      <MenuOffcanvas showCategories={showCategories} setShowCategories={setShowCategories}/>
        {/* Searcher */}
        <InputGroup className="input-search-cont">
        <InputGroup.Text id="basic-addon1"><i class="bi bi-search"></i></InputGroup.Text>
        <Form.Control
          placeholder="Buscar..."
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      {/* User */}
      <i class="bi bi-person-circle icons-2"></i>

    {/* Cart */}
      <i class="bi bi-cart icons-2 mg-r" onClick={() => setShowCart(true)}></i>
      <CartOffcanvas showCart={showCart} setShowCart={setShowCart}/>
    </header>
  );
}

export default NavBar;
