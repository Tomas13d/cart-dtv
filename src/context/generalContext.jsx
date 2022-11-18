import { createContext, useState } from "react";

export const GeneralContext = createContext()

const initialFlag = false

const GeneralContextProvider = ({children}) =>  {
    const [flag, setFlag] = useState(initialFlag)


    return <GeneralContext.Provider value={{flag, setFlag}}>{children}</GeneralContext.Provider>
}

export default GeneralContextProvider