import React, {useState} from 'react';
import {BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './firebase.js';
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"; 
import { getDatabase, ref, set } from "firebase/database";
import {useStorageState } from "react-storage-hooks";

import UserContext from "./context/UserContext";

import Header from './components/Header';
import Posts from './components/Posts';
import Post from './components/Post';
import NotFound from './components/NotFound';
import PostForm from './components/PostForm';
import Login from './components/Login';

import './App.css';
import Message from './components/Message';

const App = (props) => {
  //const [posts, setPosts] = useState([]);

  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [user, setUser] = useStorageState(localStorage, `state-user`, {});
  const [message, setMessage] = useState(null);

  const database = getDatabase();

  const onLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser({
          email: response.user["email"],
          isAuthenticated: true,
        })
      })
      .catch((error) => console.error(error));
  };

  const onLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser({isAuthenticated: false});
    }).catch((error) => console.error(error));
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      }, 1600);
  };

  const addNewPost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    delete post.key;
    set(ref(database, 'posts/' + post.slug), {
      key: null, title: post.title, content: post.content, slug: post.slug
    })
    setFlashMessage('saved');
    /*
    post.id = posts.length + 1;
    post.slug = getNewSlugFromTitle(post.title);
    setPosts([...posts, post]);
    setFlashMessage('saved'); */
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
      <UserContext.Provider value={{user, onLogin, onLogout}}>
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
              element = { user.isAuthenticated ? <PostForm newPost={true} addNewPost={addNewPost}/> : <Navigate to = "/login" />}
            />
            <Route
              path="/edit/:postSlug"
              element= { user.isAuthenticated ? <PostForm newPost={false} getPost={getPost} updatePost={updatePost}/> : <Navigate to = "/" />} 
            />
            <Route
              path="/login"
              element = { !user.isAuthenticated ? <Login /> : <Navigate to = "/" />}
              />
            <Route
              path="*"
              element={<NotFound />} 
            />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;