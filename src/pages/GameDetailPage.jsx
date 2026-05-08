import { useParams } from "react-router-dom";

export default function GameDetailPage() {
  const { id } = useParams();

  return (
    <section>
      <h1>Game detail</h1>
      <p>Game ID: {id}</p>
    </section>
  );
}
