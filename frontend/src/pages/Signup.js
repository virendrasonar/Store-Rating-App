import { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validation
  const validate = () => {
    const name = data.name.trim();
    const address = data.address.trim();
    const email = data.email.trim();
    const password = data.password;

    if (!name || !email || !password || !address) {
      return "All fields are required";
    }

    if (name.length < 20 || name.length > 60) {
      return "Name must be 20–60 characters";
    }

    if (address.length > 400) {
      return "Address must be under 400 characters";
    }

    // Gmail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return "Email must be a valid @gmail.com address";
    }

    // Strong password rule: uppercase + special character + length
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be 8–16 chars, include 1 uppercase & 1 special char";
    }

    return null;
  };

  const signup = async () => {
    const error = validate();

    // Stop if validation fails
    if (error) {
      setMessage(error);
      return;
    }

    try {
      setLoading(true);

      // API call to backend
      await axios.post("http://localhost:5000/api/auth/signup", data);

      setMessage("Signup successful! Redirecting...");

      // Delay redirect slightly for better UX
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      setMessage("Signup failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>

        <input
          placeholder="Full Name (20–60 chars)"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email (@gmail.com)"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (8–16, 1 uppercase, 1 special)"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            style={{ width: "100%", paddingRight: "60px" }}
          />

          <button
  type="button"
  className="password-toggle"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? "Hide" : "Show"}
</button>
        </div>

        <input
          placeholder="Address (max 400 chars)"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />

        <button onClick={signup} disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;