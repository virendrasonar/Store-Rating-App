import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="overlay">
        <h1 className="title">Welcome to RateShop</h1>
        <p className="tagline">Rate it. Choose better.</p>

        <div className="buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/signup">
            <button>Signup</button>
          </Link>

          <Link to="/stores">
            <button className="primary">Explore</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;