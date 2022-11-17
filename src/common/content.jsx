import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./content.css";

function Content({ products, title="Todos los Productos" }) {

  return (
    <section>
        <h4 className="content-title">{title}</h4>
        <div className="cards-cont">
            {products && products.lenght > 0 ? (
                <>
                {products.map((item, i) => (
                      <div className="item-card" key={i}>
                      <div className="cart-img-title-cont">
                        <img
                          src={item.img}
                          className="cart-item-img"
                          alt={item.name}
                        />
                        <h5 className="cart-item-title">{item.name}</h5>
                      </div>
                      <div>
                        <Button>Agregar a la lista</Button>
                      </div>
                    </div>
                ))}
                </>
            ) : (
                <p>No hay productos disponibles</p>
            )}
        </div>
    </section>
  )
}

export default Content;