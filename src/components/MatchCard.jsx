import React from "react";

export default function MatchCard({ match }) {
  if (!match || !match.info) return null;
  const info = match.info;
  const gameDuration = Math.round((info.gameDuration || 0) / 60);
  const mode = info.gameMode;

  // find participant for your summoner? we don't have puuid here; show basic info
  return (
    <div style={{ padding:12, borderRadius:8, background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <div>{mode}</div>
        <div>{gameDuration}분</div>
      </div>
      <div style={{ marginTop:8 }}>
        <div>참가자: {info.participants?.length}</div>
      </div>
    </div>
  );
}
