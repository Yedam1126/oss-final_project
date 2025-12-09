import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SummonerDetail from "../pages/SummonerPage";
import Champions from "../pages/Champions";
import Favorites from "../pages/Favorites";
import ItemDetail from "../pages/ItemDetail";
import ChampionDetail from "../pages/ChampionDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summoner/:name" element={<SummonerDetail />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/champion/:id" element={<ItemDetail />} />
        <Route path="/champions/:id" element={<ChampionDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
