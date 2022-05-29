import "./post.css";
import react from "react";
import {Link} from "react-router-dom";

export default function Post({post}) {
    const pf = "http://localhost:5000/images/";
    return (
        <div className="post">
            {post.photo && (
                <img className="postImg" src={pf + post.photo} alt="postImg"/>
            )}
            <div className="postInfo">
                <div className="postCats">
                    {
                     post.categories.map((c) => {
                         return <span className="postCat">{c}</span>
                     })   
                    }
        
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr/>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>

    )
}