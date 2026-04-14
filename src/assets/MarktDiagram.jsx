import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MarktDiagram() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1`)
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return <p>Laden...</p>;

  return (
    <div style={{ width: "300px" }}>
      <h3>Marktaandeel top 10</h3>
      <Doughnut data={{
        labels: data.map(c => c.name),
        datasets: [{
          data: data.map(c => c.market_cap),
          backgroundColor: [
            "#f97316","#3b82f6","#8b5cf6","#10b981",
            "#f59e0b","#ef4444","#06b6d4","#84cc16","#ec4899","#6366f1"
          ],
        }]
      }} />
    </div>
  );
}