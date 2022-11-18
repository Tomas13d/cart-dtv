import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GeneralContext } from "../../context/generalContext";
import categories from "../../utils/categories";
import "./menuOffcanvas.css";

function MenuOffcanvas({ setShowCategories, showCategories }) {

  const {generalData, setGeneralData} = useContext(GeneralContext)
  
const handleCategorieSelect = (item) => {
  setGeneralData({...generalData, selectedCategorie: item})
  setShowCategories(false)

}

  return (
    <Offcanvas show={showCategories} onHide={() => setShowCategories(false)}>
      <Offcanvas.Header className="offcanvas-title-cont" closeButton>
        <Offcanvas.Title>{`Hola ${""}`}</Offcanvas.Title>
      </Offcanvas.Header>


      <Offcanvas.Body className="offcanvas-body-custom">
        {categories.map((item, i) => (
          <div className="item-box" key={i} onClick={() => handleCategorieSelect(item)} >
            <h4>
              <i className={item.icon}> </i>
              {item.name}
            </h4>{" "}
            <i className="bi bi-arrow-right arrow-custom"> </i>
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
