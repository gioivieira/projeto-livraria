import React from "react";
import RoutesPage from "./Routes/RoutesPage.js";
import { baseUrlBack, baseUrlFront } from "./Constants/Constants.js"
import useRequestData from "./Hooks/useRequestData.js"
import { GlobalStyle } from "./GlobalStyle.js"

function App() {

  const [dataIngredients, isLoadingIngredients, errorIngredients, reload, setReload] = useRequestData(`${baseUrlBack}/ingredients`)

  return (
    <div>
      <GlobalStyle/>
      <RoutesPage dataIngredients={dataIngredients} isLoadingIngredients={isLoadingIngredients} errorIngredients={errorIngredients} reload={reload} setReload={setReload}/>
    </div>
  );
}

export default App
