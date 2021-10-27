import React, {useState} from 'react';
import Tweet from './Tweet';
import './App.css';

function App() {

  const [users, setUsers] = useState([
    {name: 'Ed', message: "Hello There", likes: 100},
    {name: 'John', message: "I am John Snow", likes: 1000},
    {name: 'Traversy', message: "I am awesome", likes: 20}
  ])

  const sayHello = () => {
    console.log('Hello');
  }

  const [isRed, setRed] = useState(false);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setRed(!isRed);
  };

  return (
    <>
      <div>
        <h1 className={isRed ? 'red' : ''}>Change My Color</h1>
        <button onClick={increment}>Increment</button>
        <h1>{count}</h1>
      </div>

      <div className="app">
        {users.map(user => (
          <Tweet name ={user.name} message={user.message} likes={user.likes}/>
        ))}

        <Tweet name="Dev ED" message="This is a random tweet" likes="10"/>
        <Tweet name="John Snow" message="I am the true king" likes="10"/>
        <Tweet name="Winter Is Coming" message="700k my dudes" likes="10"/>
        <Tweet name="Mosh" message="My new course is out" likes="10"/>
      </div>
    </>
  );
}

export default App;