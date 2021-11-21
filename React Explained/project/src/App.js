import React, {useState} from 'react';
import Header from './components/Header';
import Posts from './components/Posts';
import Post from './components/Post';
import NotFound from './components/NotFound';
import PostForm from './components/PostForm';

import {BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import './App.css';

const App = (props) => {
  const [posts, setPosts] = useState([]);

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    );
    posts.push(post);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Posts posts={posts} />} />
          <Route 
            path="/post/:postSlug" 
            element = {<Post posts={posts} />}
          />
          <Route 
            exact
            path="/new"
            element = {<PostForm addNewPost={addNewPost}/>}
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