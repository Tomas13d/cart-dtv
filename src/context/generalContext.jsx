import { createContext, useState } from "react";

export const GeneralContext = createContext();

const initialFlag = {
  windowFlag: false,
  selectedCategorie: {
    cod_subrubro: "",
    items: [],
  },
  allProducts: [],
};

const GeneralContextProvider = ({ children }) => {
  const [generalData, setGeneralData] = useState(initialFlag);

  return (
    <GeneralContext.Provider value={{ generalData, setGeneralData }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
