import { Routes, Route } from "react-router-dom";
import Coin from "./assets/components/coin.jsx";
import FavoCoin from "./assets/favocoin.jsx";
import SearchBar from "./assets/components/searchbar.jsx";
import CoinDetail from "./assets/components/CoinDetails.jsx";
import { useState } from "react";
import "./App.css";

function App() {
  const [favos, setFavos] = useState(["bitcoin"]);
  const [zoekterm, setZoekterm] = useState("");

  function toggleFavo(coin) {
    if (favos.includes(coin)) {
      setFavos(favos.filter(f => f !== coin));
    } else {
      setFavos([...favos, coin]);
    }
  }

  return (
    <Routes>
      <Route path="/" element={
        <div>
          <FavoCoin favos={favos} toggleFavo={toggleFavo} />
          <hr />
          <SearchBar zoekterm={zoekterm} setZoekterm={setZoekterm} />
          <Coin
            isFavo={(coin) => favos.includes(coin)}
            toggleFavo={toggleFavo}
            zoekterm={zoekterm}
          />
        </div>
      } />
      <Route path="/coin/:coinId" element={<CoinDetail />} />
    </Routes>
  );
}

export default App;