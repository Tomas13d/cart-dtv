import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import swal from "sweetalert";
import { GeneralContext } from "../../context/generalContext";
import "./cartOffcanvas.css";

function CartOffcanvas({ setShowCart, showCart }) {
  const [cart, setCart] = useState([]);

  const { generalData, setGeneralData } = useContext(GeneralContext);

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    setCart(storageCart);
  }, [generalData]);

  const handleSend = () => {
    swal({
      title: "¿Deseas confirmar este pedido?",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        
        window.localStorage.clear();
        setGeneralData({ ...generalData, windowFlag: !generalData });
        swal("Tu pedido fue realizado", {
          icon: "success",
        });
      } else {
        swal({
          title: "Cancelado",
          icon: "error",
          buttons: false,
          timer: 1000,
        });
      }
    });
    setGeneralData({ ...generalData, windowFlag: !generalData });
  };

  const handleDelet = (item) => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    for (let i in storageCart) {
      if (storageCart[i].cod_subrubro === item.cod_subrubro) {
        storageCart.splice(i, 1);
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    setGeneralData({ ...generalData, windowFlag: !generalData });
  };

  const handleDeletAll = () => {
    swal({
      title: "¿Quieres descartar esta lista?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        window.localStorage.setItem("Cart", '[]');
        setGeneralData({ ...generalData, windowFlag: !generalData });
        swal("Se eliminaron todos los productos", {
          icon: "success",
        });
      } else {
        swal({
          title: "Cancelado",
          icon: "error",
          buttons: false,
          timer: 1000,
        });
      }
    });
  };

 const handleAdd = (item) => {
  const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    for (let i in storageCart) {
      if (storageCart[i].cod_subrubro === item.cod_subrubro) {
        storageCart[i].cantidad++
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    setGeneralData({ ...generalData, windowFlag: !generalData });
 }
 const handleRemove = (item) => {
  const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    for (let i in storageCart) {
      if (storageCart[i].cod_subrubro === item.cod_subrubro) {
        if(storageCart[i].cantidad === 1){
          storageCart.splice(i, 1);
        } else {
          storageCart[i].cantidad--
        }
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    setGeneralData({ ...generalData, windowFlag: !generalData });
}


  return (
    <Offcanvas
      show={showCart}
      placement="end"
      onHide={() => setShowCart(false)}

    >
      <Offcanvas.Header className="offcanvas-title-cont" closeButton>
        <Offcanvas.Title>Mi Pedido</Offcanvas.Title>
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
                        alt={item.cod_subrubro}
                      />
                    ) : (
                      <div className="no-img">{item.cod_subrubro[0].toUpperCase()}</div>
                    )}
                    <div className="title-icons-cont">
                    <h5 className="cart-item-title"><strong>{item.cod_subrubro}</strong></h5>
                    <div className="cart-icons-cont">
                      <div className="cart-amount">
                        <i class="bi bi-dash add-remove-icons" onClick={() => handleRemove(item)}></i>
                        <h6 className="amount-number">{item.cantidad}</h6>
                        <i class="bi bi-plus-lg add-remove-icons" onClick={() => handleAdd(item)}></i>
                      </div>
                      <i
                        className="bi bi-trash cart-item-trash"
                        onClick={() => handleDelet(item)}
                      ></i>
                    </div>
                    </div>
                    
                  </div>
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
