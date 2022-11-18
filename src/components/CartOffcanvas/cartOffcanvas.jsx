import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import swal from "sweetalert";
import { GeneralContext } from "../../context/generalContext";
import "./cartOffcanvas.css";

function CartOffcanvas({ setShowCart, showCart }) {
  const [cart, setCart] = useState([]);
  

  const {generalData, setGeneralData} = useContext(GeneralContext)

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    setCart(storageCart);
  }, [generalData]);

  const handleSend = () => {
    swal({
      title: "¿Deseas confirmar este pedido?",
      icon: "warning",
      buttons: true,
      
    })
    .then((willDelete) => {
      if (willDelete) {
        window.localStorage.clear();
        setGeneralData({...generalData, windowFlag: !generalData})
        swal("Tu pedido fue realizado", {
          icon: "success",
        });
      } else {
        swal({
          title: "Cancelado",
          icon: "error",
          buttons: false,
          timer: 1000,
        })
      }
    });
    setGeneralData({...generalData, windowFlag: !generalData})
  };

  const handleDelet = (item) => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    for (let i in storageCart) {
      if (storageCart[i].id === item.id) {
        storageCart.splice(i, 1);
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    setGeneralData({...generalData, windowFlag: !generalData})
  };

  const handleDeletAll = () => {
    swal({
      title: "¿Quieres descartar esta lista?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        window.localStorage.clear();
        setGeneralData({...generalData, windowFlag: !generalData})
        swal("Se eliminaron todos los productos", {
          icon: "success",
        });
      } else {
        swal({
          title: "Cancelado",
          icon: "error",
          buttons: false,
          timer: 1000,
        })
      }
    });
    
    
  };

  return (
    <Offcanvas
      show={showCart}
      placement="end"
      onHide={() => setShowCart(false)}
    >
      <Offcanvas.Header className="offcanvas-title-cont" closeButton>
        <Offcanvas.Title>Mi Listado</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="offcanvas-body-custom">
        {cart && cart.length > 0 ? (
          <>
            <div className="list-cont">
              {cart.map((item, i) => (
                <div className="cart-item" key={i}>
                  <div className="cart-img-title-cont">
                  {item.img ? (
                      <img
                      src={item.img}
                      className="cart-item-img"
                      alt={item.name}
                    />
                  ) : (
                    <div className="no-img">{item.name[0].toUpperCase()}</div>
                  )}
                    <h5 className="cart-item-title">{item.name}</h5>
                  </div>
                  <i
                    className="bi bi-trash cart-item-trash"
                    onClick={() => handleDelet(item)}
                  ></i>
                </div>
              ))}
            </div>
            <div className="send-request">
              <Button
                className="send-reques-button cancel"
                onClick={handleDeletAll}
              >
                Descartar Pedido
              </Button>
              <Button className="send-reques-button send" onClick={handleSend}>
                Pedir Herramientas
              </Button>
            </div>
          </>
        ) : (
          <p className="no-elements-cart">
            No hay elementos agregados a la lista
          </p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartOffcanvas;
