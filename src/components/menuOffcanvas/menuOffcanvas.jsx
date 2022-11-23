import React, { useContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GeneralContext } from "../../context/generalContext";
import categories from "../../utils/categories";
import "./menuOffcanvas.css";

function MenuOffcanvas({ setShowCategories, showCategories }) {
  const { generalData, setGeneralData } = useContext(GeneralContext);
  const [clickOn, setClickOn] = useState(null)

 
  const handleCategorieSelect = (index) => {
    setClickOn(clickOn === index ? null : index)
  };

  const handleSubCategorieSelect = (item) => {
    setGeneralData({ ...generalData, selectedCategorie: item });
    setShowCategories(false);

  };

  return (
    <Offcanvas show={showCategories} onHide={() => setShowCategories(false)}>
      <Offcanvas.Header className="offcanvas-title-cont" closeButton>
        <Offcanvas.Title>{`Hola ${""}`}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="offcanvas-body-custom">
        {categories.map((categorie, i) => (
          <div className="category-sub-cont">
          <div
            className="item-box"
            key={i}
            onClick={() => handleCategorieSelect(i)}
          >
            <h4>
              <i className={categorie.icon_name}> </i>
              {categorie.rubro}
            </h4>{" "}
            <i className={`bi bi-caret-down arrow-custom ${clickOn === i ? "rotate" : ""}`}> </i>
          </div>
         
          {categorie.items &&
              categorie.items.map((subcategory) => {
                return (
                  <div className={`sub-box ${clickOn === i ? "show" : "no-display"}`}>
                  <div className="subitem-box" onClick={() => handleSubCategorieSelect(subcategory)}>
                    <h6 class="">
                      <i className={subcategory.icon_name}> </i>
                      {subcategory.cod_subrubro}
                    </h6>
                    {" "}<i className="bi bi-arrow-right arrow-custom"> </i>
                  </div>
                  </div>
                );
              })}
       
          </div>
        ))}
        <div className="logout-box">
          <h5 className="logout-message">
            <i className="bi bi-person-circle user-icon"> </i> Cerrar Sesión
          </h5>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MenuOffcanvas;
