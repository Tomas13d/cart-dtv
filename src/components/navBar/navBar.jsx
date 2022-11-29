import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { GeneralContext } from "../../context/generalContext";
import CartOffcanvas from "../CartOffcanvas/cartOffcanvas";
import MenuOffcanvas from "../menuOffcanvas/menuOffcanvas";
import "./navbar.css";

function NavBar({ products }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [optionProducts, setOptionProducts] = useState([]);
  const { generalData, setGeneralData } = useContext(GeneralContext);
  const [cartLength, setCartLength] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem("Cart"));
    if(storageCart) setCartLength(storageCart.length);
  }, [generalData]);

  useEffect(() => {
    const newArray = products.map((item) => {
      return {
        value: item.cod_subrubro,
        label: item.cod_subrubro,
        cod_subrubro: item.cod_subrubro,
        desc_subrubro: item.cod_subrubro,
        icon_name: item.icon_name,
        rubro: item.rubro,
      };
    });
    setOptionProducts(newArray);
  }, [products]);

  const handleSearch = (e) => {
    setGeneralData({
      ...generalData,
      searchedProduct: e,
    });
  };

  return (
    <header className="navbar-style">
      {/* Categories and navbar Icon */}
      <i
        className="bi bi-list icons"
        onClick={() => setShowCategories(true)}
      ></i>
      <MenuOffcanvas
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      {/* Searcher */}
      <Select
        className="searcher"
        options={optionProducts}
        onChange={handleSearch}
        value={generalData.searchedProduct}
      />

      {/* User */}
      <i className="bi bi-person-circle icons-2"></i>

      {/* Cart */}
      <div onClick={() => setShowCart(true)}>
        <div className={cartLength ? "number-cart" : "no-display"}>
          {cartLength}
        </div>
        <i className="bi bi-cart icons-2 mg-r"></i>
      </div>

      <CartOffcanvas showCart={showCart} setShowCart={setShowCart} />
    </header>
  );
}

export default NavBar;
