import { useEffect, useState } from "react";
import axios from "axios";
import "./Stores.css";

function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const token = localStorage.getItem("token");

  // fetch all stores
  const fetchStores = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/stores/all",
        {
          headers: { Authorization: token },
        }
      );

      setStores(res.data);
    } catch (err) {
      setError("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchStores();
  }, [token]);

  // search stores
  const searchStores = async (value) => {
    setSearchText(value);

    try {
      if (value.trim() === "") {
        fetchStores();
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/stores/search?search=${value}`,
        {
          headers: { Authorization: token },
        }
      );

      setStores(res.data);
    } catch (err) {
      console.log("Search error");
    }
  };

  const rate = async (id, value) => {
    try {
      await axios.post(
        "http://localhost:5000/api/ratings/add",
        { store_id: id, rating: value },
        { headers: { Authorization: token } }
      );

      setStores((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, user_rating: value } : s
        )
      );

      fetchStores();

    } catch (err) {
      alert("Rating failed");
    }
  };

  return (
    <div className="stores-page">
      <h2>Stores</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          placeholder="Search stores..."
          value={searchText}
          onChange={(e) => searchStores(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
          }}
        />
      </div>

      {!token && <p className="message">Please login to view and rate stores</p>}

      {loading && <p className="message">Loading stores...</p>}
      {error && <p className="error">{error}</p>}

      <div className="store-grid">
        {stores.map((s) => (
          <div className="store-card" key={s.id}>
            <h3>{s.name}</h3>
            <p>{s.address}</p>

            <p><b>Overall Rating:</b> {Number(s.rating).toFixed(1)}</p>
            <p><b>Your Rating:</b> {s.user_rating || "Not rated"}</p>

=            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  onClick={() => token && rate(s.id, val)}
                  style={{
                    fontSize: "24px",
                    cursor: token ? "pointer" : "not-allowed",
                    color: val <= (s.user_rating || 0) ? "#FFD700" : "#ccc"
                  }}
                >
                  ★
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Stores;