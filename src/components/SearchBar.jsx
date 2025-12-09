import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState('');
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="소환사명 입력" />
      <button onClick={() => onSearch(name)}>검색</button>
    </div>
  );
}
