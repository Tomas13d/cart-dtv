import NavBar from "./components/navBar/navBar";
import "./App.css";
import categories from "./utils/categories";
import Content from "./common/content/content";
import { GeneralContext } from "./context/generalContext";
import Footer from "./components/footer/footer";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts, setProductsByCategorie } from "./store/reducers/productsReducer";

function App() {
  const dispatch = useDispatch()
  const productsByCategorie = useSelector(state => state.products.productsByCategorie)
  const allProducts = useSelector(state => state.products.allProducts)

  useEffect(() => {
    if (categories) {
      dispatch(
        setProductsByCategorie(categories)
      )
    }
  }, []);

  useEffect(() => {
    if (productsByCategorie) {
      dispatch(
        setAllProducts(productsByCategorie)
      )
    }
  }, [productsByCategorie]);



  return (
    <>
      <NavBar products={allProducts} />
      <Content />
      {/* <Footer/> */}
    </>
  );
}

export default App;
