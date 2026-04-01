import { useState, useEffect } from "react";
import CoinChart from "./CoinChart"; 

const COINS = ["bitcoin", "ethereum", "solana", "dogecoin", "tether"];

export default function Coin() {
  // 1. "De Geheugenkaartjes" (State)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. "De Postbode" (Effect)
  useEffect(() => {
    const fetchData = async () => {
      // Vraag de huidige prijzen op bij CoinGecko
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(",")}&vs_currencies=eur&include_24hr_change=true`
      );
      const json = await res.json();
      
      setData(json);      // Sla de prijzen op in het geheugen
      setLoading(false);  // Stop met het tonen van "Laden..."
    };

    fetchData(); // Doe dit direct als de pagina start

    // 3. "De Wekker" (Interval)
    const interval = setInterval(fetchData, 60000); // Herhaal dit elke minuut
    return () => clearInterval(interval);           // Zet de wekker uit als we de pagina verlaten
  }, []);

  if (loading) return <p>Laden...</p>;

  // 4. "De Bouwtekening" (De lijst op het scherm)
  return (
    <div>
      {COINS.map((coin) => {
        const info = data[coin];
        const stijging = info.eur_24h_change >= 0;

        return (
          <div key={coin} style={cardStyle}>
            {/* Tekst aan de linkerkant */}
            <div>
              <h3>{coin.toUpperCase()}</h3>
              <p>€{info.eur.toLocaleString("nl-NL")}</p>
              <p style={{ color: stijging ? "green" : "red" }}>
                {stijging ? "▲" : "▼"} {info.eur_24h_change.toFixed(2)}%
              </p>
            </div>

            {/* De grafiek-component aan de rechterkant */}
            <div style={{ width: "200px" }}>
              <CoinChart coinId={coin} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Een klein beetje styling voor de overzichtelijkheid
const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid #333"
};