import React, {useState, useEffect, useRef}  from "react";
import {Navigate, useParams} from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = ({addNewPost, getPost, updatePost, newPost, isLoggedIn}) => {
    const [saved, setSaved] = useState(false);
    const [post, setPost] = useState({key: null, title: "", content: "", slug: ""})

    const params = useParams();

    let postdb = post;
    if(getPost && post.key == null) {
        postdb = getPost(params.postSlug);
        if(postdb.key != null) {
            setPost(postdb);
        }
    }

    const prevPostRef = useRef();
    useEffect(() => {
        prevPostRef.current = post;
    }, [post]);
    const prevPost = prevPostRef.current;

    const quillRef = useRef();
    useEffect(() => {
        if(prevPost && quillRef.current) {
            if(newPost && post.key !== null) {
                setPost({key: null, title: "", content: "", slug: ""});
                quillRef.current.getEditor().setContents('');
            }
        }
    }, [post, newPost, prevPost]);

    const handlePostForm = (event) => {
        event.preventDefault();

        if(!isLoggedIn()){
            alert("You are not logged in!");
            return;
        }

        if(post.title) {
            if(updatePost) {
                updatePost(post)
            } else {
                addNewPost(post);
            }
            setSaved(true);
        } else {
            alert("Title required");
        }
    };

    if(saved === true) {
        return <Navigate to="/" />
    }
    return(
        <form className="container" onSubmit={handlePostForm}>
            <h1>Add a New Post</h1>
            <p>
                <label htmlFor="form-title">Title:</label>
                <br />
                <input
                    id="form-title"
                    value={post.title}
                    onChange={event => setPost({...post, title: event.target.value})}
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label>
                <Quill 
                    ref={quillRef}
                    defaultValue={post.content}
                    onChange={(content, delta, source, editor) =>
                    {
                        setPost({
                            ...post, content: editor.getContents()
                        });
                    }}
                />
            </p>
            <p>
                <button type="submit">Save</button>
            </p>
        </form>
    );
}

export default PostForm;