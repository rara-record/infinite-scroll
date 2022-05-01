import HomePage from "pages/Home/HomePage";
import GlobalStyled from "styles/global";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PokenmonDetailPage from "pages/PokenmonDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyled />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/pokemons/:pokemonId"
          element={<PokenmonDetailPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
