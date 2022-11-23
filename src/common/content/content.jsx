import React, { useContext } from "react";
import swal from "sweetalert";
import { GeneralContext } from "../../context/generalContext";
import "./content.css";

function Content({ products }) {
  const { generalData, setGeneralData } = useContext(GeneralContext);

  const handleAdd = (item) => {
    const storageCart = window.localStorage.getItem("Cart");
    if (storageCart) {
      const parsedCart = JSON.parse(storageCart);
      if (parsedCart.length !== 0) {
        let flag = false;
        parsedCart.forEach((storageItem) => {
          if (storageItem.id === item.id) {
            storageItem.amount++;
            flag = true;
          }
        });
        if (!flag) {
          item.amount = 1;
          parsedCart.push(item);
        }
      } else {
        item.amount = 1;
        parsedCart.push(item);
      }
      window.localStorage.setItem("Cart", JSON.stringify(parsedCart));
    } else {
      item.amount = 1;
      const newCart = [item];
      window.localStorage.setItem("Cart", JSON.stringify(newCart));
    }
    setGeneralData({ ...generalData, windowFlag: !generalData });
    swal({
      title: "Agregado",
      text: "Se añadió un producto a la lista",
      icon: "success",
      buttons: false,
      timer: 1000,
    });
  };

  return (
    <section className="center-content-cont">
      <h4 className="content-title">
        {generalData.selectedCategorie.name
          ? generalData.selectedCategorie.name
          : "Todos los productos"}
      </h4>
      <div className="cards-cont">
        {products && products.length > 0 ? (
          <>
            {products.map((item, i) => (
              <div className="item-card" key={i}>
                <div className="img-card-cont">
                  {item.img ? (
                    <img
                      src={item.img}
                      className="cart-item-img"
                      alt={item.name}
                    />
                  ) : (
                    <div className="no-img">{item.name[0].toUpperCase()}</div>
                  )}
                </div>
                <div className="card-title-button">
                  <h5 className="card-item-title">{item.name}</h5>
                  <p className="description-item">
                    {item.description
                      ? item.description.length > 60
                        ? `${item.description.substring(0, 60)}...`
                        : item.description
                      : ""}
                  </p>
                  <div className="button-cont">
                    <button
                      className="button-add"
                      onClick={() => handleAdd(item)}
                    >
                      Agregar al pedido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </section>
  );
}

export default Content;
