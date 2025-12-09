import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./champions.css";

const DDRAGON_VERSION = "14.23.1";

export default function Champions() {
  const [allChamps, setAllChamps] = useState([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChamps() {
      try {
        const res = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/ko_KR/champion.json`
        );
        const arr = Object.values(res.data.data);
        setAllChamps(arr);
      } catch (e) {
        console.error("챔피언 로드 실패", e);
      }
    }
    fetchChamps();
  }, []);

  const roles = ["All", "Fighter", "Tank", "Assassin", "Mage", "Marksman", "Support"];

  const filtered = allChamps
    .filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter((c) => roleFilter === "All" || (c.tags && c.tags.includes(roleFilter)))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "difficulty")
        return (a.info?.difficulty || 0) - (b.info?.difficulty || 0);
      return 0;
    });

  return (
    <div className="champions-page">
      <h1>챔피언 목록</h1>

      {/* 🔍 검색 / 필터 / 정렬 */}
      <div className="champ-controls">
        <input
          type="text"
          placeholder="챔피언 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role === "All" ? "전체" : role}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">이름순</option>
          <option value="difficulty">난이도순</option>
        </select>
      </div>

      {/* 🧩 챔피언 목록 */}
      <div className="champ-grid">
        {filtered.map((champ) => (
          <div
            key={champ.id}
            className="champ-card"
            onClick={() => navigate(`/champions/${champ.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champ.image.full}`}
              alt={champ.name}
            />
            <div className="champ-info">
              <strong>{champ.name}</strong>
              <span className="champ-title">{champ.title}</span>
              <div className="champ-tags">{(champ.tags || []).join(" / ")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
