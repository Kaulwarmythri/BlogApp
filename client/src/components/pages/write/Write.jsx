import "./write.css"
import react from "react";
import axios from "axios";
import { Context } from "../../../context/AuthContext";

export default function Write() {
    const [title, setTitle] = react.useState("");
    const [desc, setDesc] = react.useState("");
    const [file, setFile] = react.useState(null);
    const {user} = react.useContext(Context);
    const [categories, setCategories] = react.useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user.username,
        }
        if(file) {
            const newData = new FormData();
            const filename = Date.now() + file.name;
            newData.append("name", filename);
            newData.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", newData);
            } catch(err) {

            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            console.log(categories);
            window.location.replace("/post/" + res.data._id)
        } catch(err) {}
    }
    return (
        <div className="write">
            {file && (<img 
                src={URL.createObjectURL(file)}
                alt="writeImg"
                className="writeImg"  />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">                 
                    <div className="group1">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fa-solid fa-plus"></i>
                        </label>
                        <input 
                            type="file" id="fileInput" name="fileInput"  style={{display:"none"}}
                            onChange={e => setFile(e.target.files[0])} />
                        <input 
                            type="text" placeholder="Title" 
                            required className="writeInput" 
                            autoFocus={true}
                            onChange={e => setTitle(e.target.value)} />
                    </div>

                    <textarea
                        required
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput"
                        onChange={e => setDesc(e.target.value)}
                        rows={6} cols={80} style={{marginLeft:"26px"}} />
                    <input 
                        type="text" placeholder="Categories"
                        required className="writeInput"
                        onChange={e => setCategories(e.target.value.split(" "))}
                        style={{marginLeft:"26px"}}  />
                </div>

                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}