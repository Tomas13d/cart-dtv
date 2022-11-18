import NavBar from "./components/navBar/navBar";
import "./App.css";
import { useEffect } from "react";
import Content from "./common/content/content";

function App() {
  const products = [
    {
      id: 1,
      name: "Soladora",
      img: "https://http2.mlstatic.com/D_NQ_NP_2X_721116-MLA41994139197_052020-F.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Destornillador",
      img: "https://http2.mlstatic.com/D_NQ_NP_2X_610549-MLA51163822487_082022-F.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "Casco",
      img: "https://http2.mlstatic.com/D_NQ_NP_2X_713838-MLA51507869848_092022-F.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      name: "Casco",
      img: "https://http2.mlstatic.com/D_NQ_NP_2X_713838-MLA51507869848_092022-F.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      name: "Casco",
      img: "https://http2.mlstatic.com/D_NQ_NP_2X_713838-MLA51507869848_092022-F.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      name: "Casco",
      img: "https://http2.mlstatic.com/D_NQ_NP_2X_713838-MLA51507869848_092022-F.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  useEffect(() => {
    if (window) {
      window.localStorage.setItem("Cart", JSON.stringify(products));
    }
  }, [window]);

  return (
    <>
      <NavBar />
      <Content products={products}/>
    </>
  );
}

export default App;
