import NavBar from "./components/navBar/navBar";
import "./App.css";
import categories from "./utils/categories";
import Content from "./common/content/content";
import { GeneralContext } from "./context/generalContext";
import Footer from "./components/footer/footer";
import { useContext, useEffect } from "react";

function App() {
  const { generalData, setGeneralData } = useContext(GeneralContext);


  

  const handleJsonItems = (categories) => {
    const transformedCategories = {};
    categories.forEach((categorie) => {
      transformedCategories[categorie.rubro] = categorie.items.map(
        (product) => {
          return { ...product, rubro: categorie.rubro };
        }
      );
    });
    return transformedCategories;
  };

  const setAllProducts = (products) => {
    const allProducts = [];
    for (let prop in products) {
      allProducts.push(products[prop]);
    }
    return allProducts.flat();
  };

  useEffect(() => {
    if (categories) {
      setGeneralData({
        ...generalData,
        selectedCategorie: {
          cod_subrubro: "",
          items: setAllProducts(handleJsonItems(categories)),
        },
        allProducts: setAllProducts(handleJsonItems(categories)),
        productsByCategorie: handleJsonItems(categories),
      });
    }
  }, []);

  return (
    <>
      <NavBar products={generalData.allProducts} />
      <Content />
      {/* <Footer/> */}
    </>
  );
}

export default App;
