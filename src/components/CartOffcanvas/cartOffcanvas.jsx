import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cartOffcanvas.css";

function CartOffcanvas({ setShowCart, showCart }) {
  
  return (
    <Offcanvas
      show={showCart}
      placement="end"
      onClick={() => setShowCart(false)}
    >
      <Offcanvas.Header className="offcanvas-title-cont" closeButton>
        <Offcanvas.Title>Mi Listado</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartOffcanvas;
