import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CoinDetail() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=eur&include_24hr_change=true`)
      .then(res => res.json())
      .then(json => setInfo(json[coinId]));
  }, [coinId]);

  if (!info) return <p>Laden...</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>← Terug</button>
      <h2>{coinId.toUpperCase()}</h2>
      <p>Prijs: €{info.eur.toLocaleString("nl-NL")}</p>
      <p>24u verandering: {info.eur_24h_change.toFixed(2)}%</p>
    </div>
  );
}