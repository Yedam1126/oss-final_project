import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "../services/api";

const Favorites = () => {
  const [list, setList] = useState([]);

  const loadFavorites = async () => {
    const res = await getFavorites();
    setList(res.data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (id) => {
    if (window.confirm("정말 삭제할까요?")) {
      await deleteFavorite(id);
      loadFavorites();
    }
  };

  return (
    <div>
      <h2>즐겨찾기 목록</h2>
      {list.map(item => (
        <div key={item.id}>
          <strong>{item.name}</strong>
          <button onClick={() => removeFavorite(item.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
