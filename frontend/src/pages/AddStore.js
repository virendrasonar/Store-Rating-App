import { useState } from "react";
import axios from "axios";

function AddStore() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const addStore = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/stores/add",
        { name, address },
        {
          headers: { Authorization: token },
        }
      );

      setMessage("Store added successfully");
      setName("");
      setAddress("");
    } catch (err) {
      setMessage("Only admin can add store");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Store</h2>

      <input
        placeholder="Store Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />

      <button onClick={addStore}>Add Store</button>

      <p>{message}</p>
    </div>
  );
}

export default AddStore;