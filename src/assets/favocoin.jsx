import { useState, useEffect } from "react";
import CoinChart from "./components/CoinChart";  // ← dit aanpassen

export default function FavoCoin({ favos, toggleFavo }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (favos.length === 0) return;
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${favos.join(",")}&vs_currencies=eur&include_24hr_change=true`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [favos]);

  if (favos.length === 0) return <p>Geen favorieten</p>;
  if (!data) return <p>Laden...</p>;

  return (
    <div>
      <h2>⭐ Favorite Coins</h2>
      {favos.map(coin => {
        const info = data[coin];
        if (!info) return null;
        const stijging = info.eur_24h_change >= 0;

        return (
          <div key={coin}>
            <span onClick={() => toggleFavo(coin)}>⭐</span>
            <h3>{coin}</h3>
            <p>€{info.eur}</p>
            <p>{stijging ? "📈 Stijging" : "📉 Daling"}</p>
            <CoinChart coin={coin} />
          </div>
        );
      })}
    </div>
  );
}