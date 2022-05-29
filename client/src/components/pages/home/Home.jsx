import "./home.css"
import Header from "../../header/Header"
import Posts from "../../posts/Posts"
import Sidebar from "../../sidebar/Sidebar"
import axios from "axios";
import react from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = react.useState([]);
    const {search} = useLocation();

    react.useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`/posts${search}`);
            setPosts(res.data);
        }
        fetchPosts();
    }, [search]);
    
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar />
            </div>
        </>
        
    )
}