import NavBar from "./components/navBar/navBar";
import "./App.css";
import categories from "./utils/categories";
import Content from "./common/content/content";
import { GeneralContext } from "./context/generalContext";
import Footer from "./components/footer/footer";
import { useContext, useEffect, useState } from "react";

function App() {
  const { generalData, setGeneralData } = useContext(GeneralContext);

  const handleJsonItems = (jsonCategories) => {
    let allProducts = [];
    jsonCategories.forEach((product) => {
      allProducts.push(product.items);
    });
    return allProducts.flat();
  };

  useEffect(() => {
    if (categories) {
      setGeneralData({
        ...generalData,
        selectedCategorie: {
          cod_subrubro: "",
          items: handleJsonItems(categories),
        },
        allProducts: handleJsonItems(categories),
      });
    }
  }, []);

  return (
    <>
      <NavBar />
      <Content />
      {/* <Footer/> */}
    </>
  );
}

export default App;
