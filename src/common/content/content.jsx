import React from "react";
import { Button } from "react-bootstrap";
import "./content.css";

function Content({ products, title = "Todos los Productos" }) {
  return (
    <section className="center-content-cont">
      <h4 className="content-title">{title}</h4>
      <div className="cards-cont">
        {products && products.length > 0 ? (
          <>
            {products.map((item, i) => (
              <div className="item-card" key={i}>
                <div className="img-card-cont">
                <img
                    src={item.img}
                    className="cart-item-img"
                    alt={item.name}
                  />
                </div>
                <div className="cart-title-button">
                  <h5 className="card-item-title">{item.name}</h5>
                  <p className="description-item">{item.description}</p>
                  <div className="button-cont">
                    <button className="button-add">Agregar a la lista</button>
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
