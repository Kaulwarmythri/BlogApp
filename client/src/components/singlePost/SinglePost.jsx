import "./singlePost.css";
import react from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/AuthContext";

export default function SinglePost() {
    const [post, setPost] = react.useState({});
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const {user} = react.useContext(Context);
    const pf = "http://localhost:5000/images/";
    const [title, setTitle] = react.useState("");
    const [desc, setDesc] = react.useState("");
    const [updateMode, setUpdateMode] = react.useState(false);

    const handleUpdate = async () => {
        try{
            await axios.put(`/posts/${post._id}`, 
            {   
                username: user.username,
                title, 
                desc,
            });
            setUpdateMode(false);
        }catch(err) {
            console.log(err);
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${post._id}`, {data: {username: user.username}});
            window.location.replace("/");
        }catch(err) {console.log(err);}
    }
    
    react.useEffect(()=> {
        const getPost = async () => {
            const res = await axios.get(`/posts/${path}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path]);
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {
                    post.photo && (<img 
                    className="singlePostImg"
                    src={pf + post.photo} 
                    alt="SinglePost"/>
                )}
                {updateMode ? <input className="singlePostTitleInput" autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> : 
                    (<h1 className="singlePostTitle">
                    {title}
                    {post.username === (user)?.username && 
                        (<div className="singlePostEdit">
                            <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                            <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                        </div>)} 
                    </h1>)
                }
                
                
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: 
                    <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? 
                    (<textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="singlePostDescInput"/>) : 
                    (<p className="singlePostDesc">{desc}</p>)}

                {updateMode && (<button className="singlePostButton" onClick={handleUpdate}>Update</button>)}
            </div>
            
        </div>
    )
}