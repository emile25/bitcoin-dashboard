import { useState } from 'react'
import './App.css'
import FavoCoin from "./assets/favocoin.jsx";
import Coin from "./assets/components/coin.jsx";

function App() {
  const [favos, setFavos] = useState(["bitcoin", "ethereum", "solana", "dogecoin", "tether"]);

  function toggleFavo(coin) {
    if (favos.includes(coin)) {
      setFavos(favos.filter(f => f !== coin));
    } else {
      setFavos([...favos, coin]);
    }
  }

  return (
    <div>
      <FavoCoin favos={favos} toggleFavo={toggleFavo} />
      <hr />
      <Coin isFavo={(coin) => favos.includes(coin)} toggleFavo={toggleFavo} />
    </div>
  );
}

export default App;