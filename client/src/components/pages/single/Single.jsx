import Sidebar from "../../sidebar/Sidebar";
import SinglePost from "../../singlePost/SinglePost";
import "./single.css";
import react from "react";

export default function Single() {
    return (
        <div className="single">
            <SinglePost />
            <Sidebar />

        </div>
    )
}