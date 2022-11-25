import axios from "axios";

export const sendCart = async ({ storageCart, token }) => {
  try {
    let body = {
      IBLE_P_COD_ACCION: "UTL_CARRITO",
      IBLE_P_CAMPO: "CREAR_TKT",
      IBLE_P_EVENTO: "CLICK",
    };
    storageCart.forEach((product, i) => {
        let keys = Object.keys(product)
        keys.forEach((key) => {
            body[`${key}.${i}`] = product[key]
        })
    })
    const ticketResponse = await axios.post(
      "https://sp10.d.z24.co/ible/ible_con/EVENTOS_CAMPOS/UTL_CARRITO/CREAR_TKT",
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return ticketResponse.data; 
  } catch (err) {
    console.log("error", err);
  }
};
