import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./championDetail.css";

const DDRAGON_VERSION = "14.23.1";

export default function ChampionDetail() {
  const { id } = useParams();
  const [champ, setChamp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/ko_KR/champion/${id}.json`
        );
        const data = res.data.data[id];
        setChamp(data);
      } catch (e) {
        console.error("챔피언 상세 로드 실패:", e);
      }
      setLoading(false);
    }

    fetchDetail();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!champ) return <div>챔피언 정보를 불러올 수 없습니다.</div>;

  /** ⭐ 즐겨찾기 추가 기능 */
  const addToFavorites = async () => {
    try {
      await axios.post("https://6916afcca7a34288a27e0948.mockapi.io/favorites", {
        champId: champ.id,
        name: champ.name,
        title: champ.title,
        image: champ.image.full, // 리스트에서 다시 이미지 불러올 때 필요함
        role: champ.tags.join(", "),
      });

      alert("즐겨찾기에 추가되었습니다!");
    } catch (error) {
      console.error("즐겨찾기 추가 실패:", error);
    }
  };

  return (
    <div className="champ-detail-page">
      <h1>{champ.name}</h1>
      <p className="champ-title">{champ.title}</p>

      {/* ⭐ 여기 즐겨찾기 버튼! */}
      <button onClick={addToFavorites} className="favorite-btn">
        ⭐ 즐겨찾기 추가
      </button>

      <img
        className="champ-splash"
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`}
        alt={champ.name}
      />

      <div className="champ-stats">
        <h2>기본 정보</h2>
        <p><strong>역할:</strong> {champ.tags.join(" / ")}</p>
        <p><strong>난이도:</strong> {champ.info.difficulty}</p>
      </div>

      <div className="champ-spells">
        <h2>스킬</h2>

        <div className="spell">
          <h3>패시브: {champ.passive.name}</h3>
          <img src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/passive/${champ.passive.image.full}`} alt="P" />
          <p>{champ.passive.description}</p>
        </div>

        {champ.spells.map((spell, idx) => (
          <div key={idx} className="spell">
            <h3>{["Q", "W", "E", "R"][idx]}: {spell.name}</h3>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/spell/${spell.image.full}`}
              alt={spell.id}
            />
            <p dangerouslySetInnerHTML={{ __html: spell.description }}></p>
          </div>
        ))}
      </div>
    </div>
  );
}
