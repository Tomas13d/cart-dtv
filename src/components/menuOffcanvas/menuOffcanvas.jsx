import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./menuOffcanvas.css";

function MenuOffcanvas({setShowCategories, showCategories}) {

  return (
        <Offcanvas show={showCategories} onClick={() => setShowCategories(false)}>
          <Offcanvas.Header className="offcanvas-title-cont" closeButton>
            <Offcanvas.Title>Hola, nombre Tecnico</Offcanvas.Title>
          </Offcanvas.Header>
       
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>

  );
}

export default MenuOffcanvas;