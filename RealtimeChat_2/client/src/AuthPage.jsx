import axios from "axios"
import { API_ENDPOINT } from "./config/config";
const AuthPage = ({ onAuth }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    // try {
    //   const res = await axios.post(`http://localhost/5000/authenticate/`, {
    //     username: value,
    //   });
    //   onAuth({ ...res.data, secret: value });
      
    // } catch (error) {
    //   console.log("error",error);
    // }
    axios
      .post("http://localhost:5000/authenticate", { username: value })
      .then((r) => onAuth({ ...r.data, secret: value }))
      .catch((e) => console.log("Auth Error", e));

  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Set a username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
