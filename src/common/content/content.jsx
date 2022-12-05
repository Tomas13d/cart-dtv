import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { GeneralContext } from "../../context/generalContext";
import "./content.css";

function Content() {
  const { generalData, setGeneralData } = useContext(GeneralContext);
  const selectedCategorie = useSelector(state => state.general.selectedCategorie)

  useEffect(() => {
    if (
      generalData &&
      generalData.searchedProduct &&
      generalData.searchedProduct.value
    ) {
      setGeneralData({
        ...generalData,
        selectedCategorie: {
          rubro: "",
          items: [
            {
              cod_subrubro: generalData.searchedProduct.value,
              desc_subrubro: generalData.searchedProduct.value,
              icon_name: generalData.searchedProduct.icon_name,
              rubro: generalData.searchedProduct.rubro,
            },
          ],
        },
      });
    }
  }, [generalData.searchedProduct]);

  const handleAdd = (item) => {
    const storageCart = window.localStorage.getItem("Cart");
    if (storageCart) {
      const parsedCart = JSON.parse(storageCart);
      if (parsedCart.length !== 0) {
        let flag = false;
        parsedCart.forEach((storageItem) => {
          if (storageItem.cod_subrubro === item.cod_subrubro) {
            storageItem.cantidad++;
            flag = true;
          }
        });
        if (!flag) {
          item.cantidad = 1;
          parsedCart.push(item);
        }
      } else {
        item.cantidad = 1;
        parsedCart.push(item);
      }
      window.localStorage.setItem("Cart", JSON.stringify(parsedCart));
    } else {
      item.cantidad = 1;
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
        {selectedCategorie.cod_subrubro
          ? `Categoria > ${selectedCategorie.cod_subrubro.toLowerCase()}`
          : "Todos los productos"}
      </h4>
      <div className="cards-cont">
        {selectedCategorie &&
        selectedCategorie.items.length > 0 ? (
          <>
            {selectedCategorie.items.map((item, i) => (
              <div className="item-card" key={i}>
                <div className="img-card-cont">
                  {item.img ? (
                    <img
                      src={item.img}
                      className="cart-item-img"
                      alt={item.name}
                    />
                  ) : (
                    item.icon_name ? (
                      <div className="no-img">
                        <i className={`${item.icon_name} card_icon`}></i>
                    </div>
                      
                    ) : (
                    <div className="no-img">
                      {item.cod_subrubro[0].toUpperCase()}
                    </div>
                    )
                  )}
                </div>
                <div className="card-title-button">
                  <h5 className="card-item-title">{item.cod_subrubro}</h5>
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
