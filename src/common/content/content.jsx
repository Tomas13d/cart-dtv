import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { setFlag, setSelectedCategorie } from "../../store/reducers/generalReducer";
import "./content.css";

function Content() {
  const selectedCategorie = useSelector(state => state.general.selectedCategorie)
  const searchedProduct = useSelector(state => state.general.searchedProduct)
  const flagStore = useSelector(state => state.general.windowFlag)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      searchedProduct &&
      searchedProduct.value
    ) {
      dispatch(
        setSelectedCategorie({
          rubro: "",
          items: [
            {
              cod_subrubro: searchedProduct.value,
              desc_subrubro: searchedProduct.value,
              icon_name: searchedProduct.icon_name,
              rubro: searchedProduct.rubro,
            },
          ],
        },)
      )
  }}, [searchedProduct]);

  const handleAdd = (item) => {
    let product = {}
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
          product = {
            ...item,
            cantidad: 1
          }
          parsedCart.push(product);
        }
      } else {
        product = {
          ...item,
          cantidad: 1
        }
        parsedCart.push(product);
      }
      window.localStorage.setItem("Cart", JSON.stringify(parsedCart));
    } else {
      product = {
        ...item,
        cantidad: 1
      }
      const newCart = [product];
      window.localStorage.setItem("Cart", JSON.stringify(newCart));
    }
    dispatch(
      setFlag(flagStore ? false : true)
    )
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
