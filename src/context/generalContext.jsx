import { createContext, useState } from "react";

export const GeneralContext = createContext();

const initialFlag = {
  windowFlag: false,
  selectedCategorie: {
    cod_subrubro: "",
    items: [],
  },
  productsByCategorie: {},
  allProducts: [],
  searchedProduct: {
    value: "",
    label: ""
  },
};

const initialUser = {
     
}

const GeneralContextProvider = ({ children }) => {
  const [generalData, setGeneralData] = useState(initialFlag);
  const [sessionUser, setSessionUser] = useState(initialUser)

  return (
    <GeneralContext.Provider value={{ generalData, setGeneralData, sessionUser, setSessionUser}}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
