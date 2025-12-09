import React from 'react';

export default function SummonerProfile({ summoner, rank }) {
  if (!summoner) return null;
  return (
    <div>
      <h2>{summoner.name}</h2>
      <p>레벨: {summoner.summonerLevel}</p>
      {rank && rank.length ? <p>솔로: {rank[0].tier} {rank[0].rank} ({rank[0].wins}W/{rank[0].losses}L)</p> : <p>언랭</p>}
    </div>
  );
}
