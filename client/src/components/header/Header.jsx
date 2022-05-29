import "./header.css"
import react from "react";

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img className="headerImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyjWtPmrPNd8Ggp9i5FufghBCnHGbidUQMmg&usqp=CAU"/>
        </div>
    )
}