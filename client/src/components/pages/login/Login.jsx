import { Link } from "react-router-dom";
import "./login.css";
import react, { useContext } from "react";
import { Context } from "../../../context/AuthContext";
import axios from "axios";
import Google from "../../../img/Google2.png";

export default function Login() {
    const emailRef = react.useRef();
    const passwordRef = react.useRef();
    const {isFetching, dispatch} = useContext(Context);
    const [error, setError] = react.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        } catch(err) {
            dispatch({type: "LOGIN_FAILURE", payload: err});
            setError(true);
        }
    };

    const loginGoogle = async () => {
        window.open("https://localhost:5000/api/auth/google", "_self");
    }

    return (
        <div className="login">
            <span className="loginTitle">LOGIN</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <input 
                    className="loginInput" id="email" required
                    name="email" type="email" placeholder="Enter your email..." 
                    ref={emailRef}
                    />
                <input 
                    className="loginInput" id="password" required
                    name="password" type="password" placeholder="Enter your password..."
                    ref={passwordRef}
                     />

                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
                <button className="loginRegisterButton">
                    <Link className="link" to="/register">Register</Link>
                </button>
                {error && (<span style={{color: "red", textAlign: "center", fontWeight: "bold", marginTop: "18px"}}>Wrong credentials!</span>)}
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