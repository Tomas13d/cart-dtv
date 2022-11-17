import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./menuOffcanvas.css";

function MenuOffcanvas({setShowCategories, showCategories}) {
  const user = "Carlos"
  const categories = [
    {
      icon: "bi bi-plugin",
      name: "Herramientas Eléctricas",
      subcategories: "",
    },
    {
      icon: "bi bi-screwdriver",
      name: "Herramientas Manuales",
      subcategories: "",
    },
    {
      icon: "bi bi-shield-check",
      name: "Proteccion Personal",
      subcategories: "",
    },
  ];

  return (
        <Offcanvas show={showCategories} onHide={()=> setShowCategories(false)}>
          <Offcanvas.Header className="offcanvas-title-cont" closeButton>
            <Offcanvas.Title>{`Hola ${user}`}</Offcanvas.Title>
          </Offcanvas.Header>
       
          <Offcanvas.Body className="offcanvas-body-custom">
          {categories.map((item, i) => (
            <div className="item-box" key={i}>
                <h4><i className={item.icon}> </i>{item.name}</h4> <i className="bi bi-arrow-right arrow-custom"> </i>
            </div>
        ))}
        <div className="logout-box">
            <h5 className="logout-message"><i className="bi bi-person-circle user-icon"> </i> Cerrar Sesión</h5> 
        </div>
          </Offcanvas.Body>
        </Offcanvas>

  );
}

export default MenuOffcanvas;