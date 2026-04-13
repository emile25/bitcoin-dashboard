import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CoinDetail() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then(res => res.json())
      .then(json => setInfo(json));
  }, [coinId]);

  if (!info) return <p>Laden...</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>← Terug</button>

      <img src={info.image.large} alt={coinId} width="80" />
      <h2>{info.name}</h2>
      <p>Symbool: {info.symbol.toUpperCase()}</p>

      <p>Prijs: €{info.market_data.current_price.eur.toLocaleString("nl-NL")}</p>
      <p>24u verandering: {info.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Marktwaarde: €{info.market_data.market_cap.eur.toLocaleString("nl-NL")}</p>
      <p>Volume 24u: €{info.market_data.total_volume.eur.toLocaleString("nl-NL")}</p>
      <p>Hoogste 24u: €{info.market_data.high_24h.eur.toLocaleString("nl-NL")}</p>
      <p>Laagste 24u: €{info.market_data.low_24h.eur.toLocaleString("nl-NL")}</p>
      <p>Beschikbaar aanbod: {info.market_data.circulating_supply.toLocaleString("nl-NL")}</p>

      {info.description.en && (
        <p>{info.description.en.replace(/<[^>]*>/g, "")}</p>
      )}
    </div>
  );
}