import NavBar from "./components/navBar/navBar";
import "./App.css";
import products from "./utils/products";
import Content from "./common/content/content";
import GeneralContextProvider from "./context/generalContext";
import Footer from "./components/footer/footer";


function App() {
  

  return (
    <GeneralContextProvider>
      <NavBar />
      <Content products={products}/>
      <Footer/>
    </GeneralContextProvider>
  
  );
}

export default App;
