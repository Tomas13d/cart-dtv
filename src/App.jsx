import NavBar from "./components/navBar/navBar";
import "./App.css";
import products from "./utils/products";
import Content from "./common/content/content";
import GeneralContextProvider from "./context/generalContext";


function App() {
  

  return (
    <GeneralContextProvider>
      <NavBar />
      <Content products={products}/>
    </GeneralContextProvider>
  
  );
}

export default App;
