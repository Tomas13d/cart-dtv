import React, { useContext, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GeneralContext } from "../../context/generalContext";
import categories from "../../utils/categories";
import "./menuOffcanvas.css";

function MenuOffcanvas({ setShowCategories, showCategories }) {
  const { generalData, setGeneralData } = useContext(GeneralContext);
  const [clickOn, setClickOn] = useState(null)

  /* const handleCategorieSelect = (index) => {
    setClickOn(clickOn === index ? null : index)
  };
 */
  const handleSubCategorieSelect = (categorie) => { 
    setGeneralData({ ...generalData, searchedProduct: {value:"", label:""}, selectedCategorie: {
      cod_subrubro: categorie,
      items: generalData.productsByCategorie[categorie],
    } });
    setShowCategories(false);
  };

  const selectAllProducts = () => {
    setGeneralData({ ...generalData, searchedProduct: {value:"", label:""}, selectedCategorie: {
      cod_subrubro: "",
      items: generalData.allProducts
    }});
    setShowCategories(false);
  }

  return (
    <Offcanvas show={showCategories} onHide={() => setShowCategories(false)} className="menu">
      <Offcanvas.Header className="offcanvas-title-cont" closeButton closeVariant='white'>
        <Offcanvas.Title>{`Hola ${""}`}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="offcanvas-body-custom">
      <div
            className="item-box"
            onClick={selectAllProducts}
          >
            <h4>
              <i className=""> </i>
              TODOS LOS PRODUCTOS
            </h4>{" "}
            <i className={`bi bi-arrow-right arrow-custom`}> </i>
          </div>
        {generalData && generalData.productsByCategorie && 
            Object.keys(generalData.productsByCategorie).map((categorie, i) =>(
              <div className="category-sub-cont">
          <div
            className="item-box"
            key={i}
            onClick={() => handleSubCategorieSelect(categorie)}
          >
            <h4>
              <i className={categorie}> </i>
              {categorie}
            </h4>{" "}
            <i className={`bi bi-arrow-right arrow-custom`}> </i>
          </div>
          
         
          {/* {jsonCategories.items &&
              jsonCategories.items.map((subcategory, i ) => {
                return (
                  <div key={i} className={`sub-box ${clickOn === i ? "show" : "no-display"}`}>
                  <div className="subitem-box" onClick={() => handleSubCategorieSelect(subcategory)}>
                    <h6 class="">
                      <i className={subcategory.icon_name}> </i>
                      {subcategory.cod_subrubro}
                    </h6>
                    {" "}<i className="bi bi-arrow-right arrow-custom"> </i>
                  </div>
                  </div>
                );
              })} */}
       
          </div>
            ))        
        }
        
        <div className="logout-box">
          <h5 className="logout-message">
            <i className="bi bi-box-arrow-right user-icon"> </i> Cerrar Sesión
          </h5>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MenuOffcanvas;
