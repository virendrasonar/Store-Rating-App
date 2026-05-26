import { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [ratingsRes, statsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/owner/ratings", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:5000/api/owner/stats", {
          headers: { Authorization: token },
        }),
      ]);

      setRatings(ratingsRes.data);
      setStats(statsRes.data);

    } catch (err) {
      alert("Failed to load owner data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Owner Dashboard</h2>

      {loading && <p>Loading...</p>}

      <h3>Store Ratings</h3>
      {!loading && stats.length === 0 && <p>No stores found</p>}

      {stats.map((s) => (
        <div key={s.id}>
          {s.name} — ⭐ {Number(s.avg_rating).toFixed(1)}
        </div>
      ))}

      <hr />

      <h3>Customer Ratings</h3>
      {!loading && ratings.length === 0 && <p>No ratings yet</p>}

      {ratings.map((r, i) => (
        <div key={i}>
          {r.user_name} ({r.email}) rated {r.store_name} → ⭐ {r.rating}
        </div>
      ))}
    </div>
  );
}

export default OwnerDashboard;