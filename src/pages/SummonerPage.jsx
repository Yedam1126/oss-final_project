import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchCard from "../components/MatchCard";

// ===== 임시 API 함수 (백엔드 연동 전까지 실행 가능) =====
async function getSummonerData(name) {
  const res = await fetch(`/api/summoner/${name}`);
  return res.json();
}

async function getMatchList(puuid) {
  const res = await fetch(`/api/matches/${puuid}`);
  return res.json();
}

async function getMatchDetail(id) {
  const res = await fetch(`/api/match/${id}`);
  return res.json();
}

async function addFavorite(data) {
  await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// ===== 실제 컴포넌트 =====
export default function SummonerDetail() {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = await getSummonerData(name);
        setProfile(p);
        const ids = await getMatchList(p.puuid);
        const details = await Promise.all(ids.map((id) => getMatchDetail(id)));
        setMatches(details);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [name]);

  const handleAddFav = async () => {
    if (!profile) return;
    try {
      await addFavorite({
        name: profile.name,
        level: profile.summonerLevel,
        profileIcon: `http://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${profile.profileIconId}.png`,
        tier: "unknown",
        server: "KR",
        note: "",
        createdAt: new Date().toISOString(),
      });
      alert("즐겨찾기에 추가되었습니다.");
    } catch (e) {
      console.error(e);
      alert("추가 실패");
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (!profile) return <div>소환사를 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${profile.profileIconId}.png`}
          alt="icon"
          style={{ width: 64, height: 64 }}
        />
        <div>
          <h2>{profile.name}</h2>
          <div>레벨: {profile.summonerLevel}</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={handleAddFav} style={{ padding: "8px 12px", borderRadius: 8 }}>
            ⭐ 즐겨찾기 추가
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: 20 }}>최근 전적</h3>
      <div style={{ display: "grid", gap: 12 }}>
        {matches.map((m, idx) => (
          <MatchCard key={idx} match={m} />
        ))}
      </div>
    </div>
  );
}
