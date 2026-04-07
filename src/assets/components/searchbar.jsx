export default function SearchBar({ zoekterm, setZoekterm }) {
  return (
    <input
      type="text"
      placeholder="Zoek een coin..."
      value={zoekterm}
      onChange={(e) => setZoekterm(e.target.value)}
    />
  );
}