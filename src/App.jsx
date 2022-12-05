import NavBar from "./components/navBar/navBar";
import categories from "./utils/categories";
import Content from "./common/content/content";
import Footer from "./components/footer/footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProducts,
  setProductsByCategorie,
} from "./store/reducers/productsReducer";
import { setSelectedCategorie } from "./store/reducers/generalReducer";

function App() {
  const dispatch = useDispatch();
  const productsByCategorie = useSelector(
    (state) => state.products.productsByCategorie
  );
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    if (categories) {
      dispatch(setProductsByCategorie(categories));
    }
  }, []);

  useEffect(() => {
    if (productsByCategorie) {
      dispatch(setAllProducts(productsByCategorie));
    }
  }, [productsByCategorie]);

  useEffect(() => {
    if (allProducts) {
      dispatch(
        setSelectedCategorie({
          cod_subrubro: "",
          items: allProducts,
        })
      );
    }
  }, [allProducts]);

  return (
    <>
      <NavBar products={allProducts} />
      <Content />
      {/* <Footer/> */}
    </>
  );
}

export default App;
