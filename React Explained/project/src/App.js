import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './firebase.js';
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"; 
import { getDatabase, ref, set, onValue } from "firebase/database";
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
  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [user, setUser] = useStorageState(localStorage, `state-user`, {});
  const [message, setMessage] = useState(null);

  const database = getDatabase();
  const auth = getAuth();

  const onLogin = (email, password) => {
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
    signOut(auth).then(() => {
      setUser({isAuthenticated: false});
    }).catch((error) => console.error(error));
  };

  const isLoggedIn = () => {
    const user = auth.currentUser;
    console.log("user", user);
    
    return (user != null);
  }

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
    if(!isLoggedIn)
    {
      alert("You are not logged in!");
      return;
    }
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

    useEffect(() => {
      const postsRef = ref(database, 'posts');
      onValue(postsRef, (snapshot) => {
        const posts = snapshot.val();
        const newStatePosts = [];
        for(let post in posts)
        {
          newStatePosts.push({
            slug: posts[post].slug,
            title: posts[post].title, 
            content: posts[post].content
          });
        }
        setPosts(newStatePosts);
      });
    }, [setPosts])

  return (
    <Router>
      <UserContext.Provider value={{user, onLogin, onLogout}}>
        <div className="App">
          <Header />
          {message && <Message type={message} />}
          <Routes>
            <Route exact path="/" element={<Posts deletePost={deletePost} posts={posts} isLoggedIn={isLoggedIn} />} />
            <Route 
              path="/post/:postSlug" 
              element = {<Post posts={posts} />}
            />
            <Route 
              exact
              path="/new"
              element = { user.isAuthenticated ? <PostForm newPost={true} isLoggedIn={isLoggedIn} addNewPost={addNewPost}/> : <Navigate to = "/login" />}
            />
            <Route
              path="/edit/:postSlug"
              element= { user.isAuthenticated ? <PostForm newPost={false} isLoggedIn={isLoggedIn} getPost={getPost} updatePost={updatePost}/> : <Navigate to = "/" />} 
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