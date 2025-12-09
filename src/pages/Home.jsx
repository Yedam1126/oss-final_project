import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ color: "white" }}>
      <h1>롤 전적 검색</h1>

      <nav>
        <Link to="/champions" style={{ marginRight: 10 }}>챔피언</Link>
        <Link to="/favorites">즐겨찾기</Link>
      </nav>
    </div>
  );
};

export default Home;
