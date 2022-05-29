import Sidebar from "../../sidebar/Sidebar";
import "./settings.css";
import react from "react";
import { Context } from "../../../context/AuthContext";
import axios from "axios";

export default function Settings() {
    const {user, dispatch} = react.useContext(Context);

    const [username, setUsername] = react.useState("");
    const [email, setEmail] = react.useState("");
    const [file, setFile] = react.useState(null);
    const [success, setSuccess] = react.useState(false);

    const pf = "http://localhost:5000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });

        const updatedUser = {
        userId: user._id,
        username: username ? username : user.username,
        email: email ? email : user.email,
        };

        if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {}
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
  };

  const handleDelete = async () => {
    try{
        await axios.delete(`/users/${user._id}`, {data: {username: user.username, userId: user._id}});
        dispatch({type: "LOGOUT"});
        window.location.replace("/register");

    }catch(err) {
        console.log(err);
    }
    
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <label htmlFor="fileInput">
              {
              user.profilePic || file ? (
                <img
                  className="profilePicImg"
                  src={file ? URL.createObjectURL(file) : pf+user.profilePic}
                  alt=""
                />
              ) :
              <i className="fa-solid fa-circle-user settingsPPIcon"></i>
              }
            </label>
            
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={username ? username : user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email ? email : user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}


//check2 => check2123