import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// STAP 1: Vertel de computer dat we grafieken willen gaan tekenen
ChartJS.register(...registerables);

const CoinChart = ({ coinId }) => {
  const [grafiekData, setGrafiekData] = useState(null);

  // STAP 2: Haal de prijs-geschiedenis op bij CoinGecko
  useEffect(() => {
    const haalDataOp = async () => {
      // 1. Vraag de gegevens op voor de opgegeven munt (coinId)
      const resultaat = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=7`
      );

      // 2. Pak alleen de prijzen uit het resultaat
      const prijzen = resultaat.data.prices;

      // 3. Zet de data om naar een formaat dat de grafiek snapt
      setGrafiekData({
        labels: prijzen.map(p => ""), // We laten de datums onderaan even weg voor de rust
        datasets: [
          {
            data: prijzen.map(p => p[1]), // De prijzen zelf
            borderColor: '#3b82f6',       // Kleur van de lijn (blauw)
            tension: 0.4,                 // Maakt de lijn mooi rond
            pointRadius: 0,               // Geen stipjes op de lijn
          },
        ],
      });
    };

    haalDataOp();
  }, [coinId]); // Doe dit opnieuw als we een andere munt kiezen

  // STAP 3: Toon de grafiek op het scherm
  if (!grafiekData) return <span>...</span>; // Als de data er nog niet is

  return (
    <div style={{ height: '80px', width: '150px' }}>
      <Line 
        data={grafiekData} 
        options={{ 
          plugins: { legend: { display: false } }, // Geen tekst boven de grafiek
          scales: { x: { display: false }, y: { display: false } } // Geen assen
        }} 
      />
    </div>
  );
};

export default CoinChart;