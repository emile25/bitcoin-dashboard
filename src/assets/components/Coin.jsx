import CoinChart from "./CoinChart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COINS = ["bitcoin", "ethereum", "solana", "dogecoin", "tether"];

export default function Coin({ isFavo, toggleFavo, zoekterm }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(",")}&vs_currencies=eur&include_24hr_change=true`
      );
      const json = await res.json();
      setData(json);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Laden...</p>;

  const gefilterd = COINS.filter(coin =>
    coin.includes(zoekterm.toLowerCase())
  );

  return (
    <div>
      {gefilterd.map((coin) => {
        const info = data[coin];
        const stijging = info.eur_24h_change >= 0;

        return (
          <div key={coin} style={cardStyle} onClick={() => navigate(`/coin/${coin}`)}>
            <div>
              <span onClick={(e) => { e.stopPropagation(); toggleFavo(coin); }}>
                {isFavo(coin) ? "⭐" : "☆"}
              </span>
              <h3>{coin.toUpperCase()}</h3>
              <p>€{info.eur.toLocaleString("nl-NL")}</p>
              <p style={{ color: stijging ? "green" : "red" }}>
                {stijging ? "▲" : "▼"} {info.eur_24h_change.toFixed(2)}%
              </p>
            </div>
            <div style={{ width: "200px" }}>
              <CoinChart coinId={coin} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid #333",
  cursor: "pointer"
};