import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: { Authorization: token },
        }
      );

      setData(res.data);
    } catch (err) {
      alert("Access denied (Admin only)");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Users</h3>
          <p>{data.users}</p>
        </div>

        <div style={cardStyle}>
          <h3>Stores</h3>
          <p>{data.stores}</p>
        </div>

        <div style={cardStyle}>
          <h3>Ratings</h3>
          <p>{data.ratings}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  background: "#f5f5f5",
  borderRadius: "10px",
  width: "150px",
  textAlign: "center",
};

export default AdminDashboard;