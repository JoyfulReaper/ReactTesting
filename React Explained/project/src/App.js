import React, {useState} from 'react';
import Header from './components/Header';
import Posts from './components/Posts';
import Post from './components/Post';
import NotFound from './components/NotFound';
import PostForm from './components/PostForm';

import {BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Message from './components/Message';

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      }, 1600);
  };
  

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = getNewSlugFromTitle(post.title);
    setPosts([...posts, post]);
    setFlashMessage('saved');
  }

  const updatePost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    const index = posts.findIndex((p) => p.id === post.id);
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));
    const updatedPosts = [...oldPosts, post].sort((a,b) => a.id - b.id);
    setPosts(updatedPosts);
    setFlashMessage("updated"); 
  }

  const deletePost = (post) => {
    if(window.confirm("Delete this post?"))
    {
      const updatedPosts = posts.filter((p) => p.id !== post.id);
      setPosts(updatedPosts);
      setFlashMessage('deleted');
    }
  }

  const getNewSlugFromTitle = (title) => (
    encodeURIComponent(
      title.toLowerCase().split(" ").join("-"))
  );

  const getPost = (slug) => (
    posts.find((post) => post.slug === slug)
  );

  return (
    <Router>
      <div className="App">
        <Header />
        {message && <Message type={message} />}
        <Routes>
          <Route exact path="/" element={<Posts deletePost={deletePost} posts={posts} />} />
          <Route 
            path="/post/:postSlug" 
            element = {<Post posts={posts} />}
          />
          <Route 
            exact
            path="/new"
            element = {<PostForm newPost={true} addNewPost={addNewPost}/>}
          />
          <Route
            path="/edit/:postSlug"
            element= {<PostForm newPost={false} getPost={getPost} updatePost={updatePost}/>} 
          />
          <Route
            path="*"
            element={<NotFound />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;