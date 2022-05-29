import { Link } from "react-router-dom";
import "./register.css";
import react from "react";
import axios from "axios";
import Google from "../../../img/Google2.png"
export default function Regsiter() {
    const [username, setUsername] = react.useState("");
    const [email, setEmail] = react.useState("");
    const [password, setPassword] = react.useState("");
    const [error, setError] = react.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            const res = await axios.post("/auth/register", {
                username, 
                email, 
                password,
            });
            res.data && window.location.replace("/login")
        } catch(err) {
            setError(true);
        }
    };

    const loginGoogle = async () => {
        window.open("https://localhost:5000/api/auth/google", "_self");
    }

    return (
        <div className="register">
            <span className="registerTitle">REGISTER</span>
            <form className="right registerForm" onSubmit={handleSubmit}>
              
                <input 
                    className="registerInput" id="username" 
                    name="username" type="text" placeholder="Enter your username..." 
                    onChange={e => setUsername(e.target.value)} />
            
                <input 
                    className="registerInput" 
                    id="email" name="email" type="email" 
                    placeholder="Enter your email..." 
                    onChange={e => setEmail(e.target.value)} />
                <input 
                    className="registerInput" 
                    id="password" name="password" type="password" 
                    placeholder="Enter your password..." 
                    onChange={e => setPassword(e.target.value)} />
                <button className="registerButton" type="submit">Register</button>
                <button className="registerLoginButton">
                    <Link className="link" to="/login">Login</Link>
                </button>
                {error && (<span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>)}
            </form>
            <div className="wrapper">
                <div className="line"></div>
                <div className="or">OR</div>
                <div className="line"></div>    
            </div>
            <div className="googleLoginButton google" onClick={loginGoogle}>
                <img  src={Google} alt="" className="icon"/>
                Login with Google
            </div>
        </div>
    )
}