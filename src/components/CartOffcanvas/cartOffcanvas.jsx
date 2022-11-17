import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cartOffcanvas.css";

function CartOffcanvas({ setShowCart, showCart }) {
  const [cart, setCart] = useState([]);
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    setCart(storageCart);
  }, [flag]);

  const handleSend = () => {


    setFlag(flag ? false : true)
  }

  const handleDelet = (item) => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    for(let i in storageCart){
      if(storageCart[i].id === item.id){
        storageCart.splice(i,1)
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    setFlag(flag ? false : true)
  }

  const handleDeletAll = () => {
    window.localStorage.clear()
    setFlag(flag ? false : true)
  }

 
  return (
    <Offcanvas
      show={showCart}
      placement="end"
      onHide={()=> setShowCart(false)}
    >
      <Offcanvas.Header className="offcanvas-title-cont" closeButton>
        <Offcanvas.Title>Mi Listado</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="offcanvas-body-custom">
        {cart && cart.length > 0 ? (
          <>
          {cart.map((item, i) => (
              <div className="cart-item" key={i}>
                <div className="cart-img-title-cont">
                  <img
                    src={item.img}
                    className="cart-item-img"
                    alt={item.name}
                  />
                  <h5 className="cart-item-title">{item.name}</h5>
                </div>
                <i className="bi bi-trash cart-item-trash" onClick={() => handleDelet(item)}></i>
              </div>
            ))} 
          <div className="send-request">
            <Button className="send-reques-button cancel" onClick={handleDeletAll}>Descartar Pedido</Button>
            <Button className="send-reques-button send">Pedir Herramientas</Button>
        </div>
        </>
        ) : (
          <p className="no-elements-cart">No hay elementos agregados a la lista</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartOffcanvas;
