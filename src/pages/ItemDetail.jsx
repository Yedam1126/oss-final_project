import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DDRAGON_VERSION = "14.23.1";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/ko_KR/champion/${id}.json`
        );
        setItem(res.data.data[id]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.name}</h1>
      <h3>{item.title}</h3>

      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${item.image.full}`}
        alt={item.name}
        style={{ width: "300px" }}
      />

      <p>{item.blurb}</p>
    </div>
  );
}

export default ItemDetail;
