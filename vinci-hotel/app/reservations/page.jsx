import ChartExample from "../../components/Piechart/index.jsx";

//exemple pour modifier le pieChart
export default function Reservations() {
  return (
    <div>
      <ChartExample
        data={[
          { asset: "Crypto", amount: 20000 },
          { asset: "NFTs", amount: 10000 },
        ]}
        title="Digital Assets Composition"
        colors={["#FFD700", "#C0C0C0"]}
      />
    </div>
  );
}
