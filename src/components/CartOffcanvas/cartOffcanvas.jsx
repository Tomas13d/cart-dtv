import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import swal from "sweetalert";
import { GeneralContext } from "../../context/generalContext";
import "./cartOffcanvas.css";
import { sendCart } from "../../service/cart";
import { useDispatch, useSelector } from "react-redux";
import { setFlag } from "../../store/reducers/generalReducer";

function CartOffcanvas({ setShowCart, showCart }) {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.general.windowFlag);

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    setCart(storageCart);
  }, [flag]);

  const handleSend = () => {
    swal({
      title: "¿Deseas confirmar este pedido?",
      icon: "warning",
      buttons: true,
    }).then((willAcept) => {
      if (willAcept) {
        let token =
          "9c9145ea23717c53e730b42ba02ff909bf89bc7763f7fb55f1d70135463dd576c7c75f622dd92901d63c94d2ea80ef60bd89fba05b95b4a8394e6ad763f6";
        const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
        sendCart({ storageCart, token }).then((response) => {
          swal(
            "Pedido Enviado",
            response.acciones.acciones_alert[0].data,
            "success"
          );
        });
        dispatch(setFlag(flag ? false : true));
      } else {
        swal({
          title: "Cancelado",
          icon: "error",
          buttons: false,
          timer: 1000,
        });
      }
    });
    dispatch(setFlag(flag ? false : true));
  };

  const handleDelet = (item) => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    for (let i in storageCart) {
      if (storageCart[i].cod_subrubro === item.cod_subrubro) {
        storageCart.splice(i, 1);
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    dispatch(setFlag(flag ? false : true));
  };

  const handleDeletAll = () => {
    swal({
      title: "¿Quieres descartar esta lista?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        window.localStorage.setItem("Cart", "[]");
        dispatch(setFlag(flag ? false : true));
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
        storageCart[i].cantidad++;
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    dispatch(setFlag(flag ? false : true));
  };
  const handleRemove = (item) => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    for (let i in storageCart) {
      if (storageCart[i].cod_subrubro === item.cod_subrubro) {
        if (storageCart[i].cantidad === 1) {
          storageCart.splice(i, 1);
        } else {
          storageCart[i].cantidad--;
        }
      }
    }
    window.localStorage.setItem("Cart", JSON.stringify(storageCart));
    dispatch(setFlag(flag ? false : true));
  };

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
                    ) : item.icon_name ? (
                      <div className="no-img">
                        <i className={`${item.icon_name} card_icon`}></i>
                      </div>
                    ) : (
                      <div className="no-img">
                        {item.cod_subrubro[0].toUpperCase()}
                      </div>
                    )}
                    <div className="title-icons-cont">
                      <h5 className="cart-item-title">
                        <strong>{item.cod_subrubro}</strong>
                      </h5>
                      <div className="cart-icons-cont">
                        <div className="cart-amount">
                          <i
                            className="bi bi-dash add-remove-icons"
                            onClick={() => handleRemove(item)}
                          ></i>
                          <h6 className="amount-number">{item.cantidad}</h6>
                          <i
                            className="bi bi-plus-lg add-remove-icons"
                            onClick={() => handleAdd(item)}
                          ></i>
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
