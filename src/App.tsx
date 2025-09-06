import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pokedex/home";
import Detail from "./Pokedex/detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
