import Post from "../post/Post"
import "./posts.css"
import react from "react";

export default function Posts({posts}) {
    return (
        <div className="posts">
           {posts.map((p) => {
               return <Post post={p}/>
           })
           }
        </div>
    )
}