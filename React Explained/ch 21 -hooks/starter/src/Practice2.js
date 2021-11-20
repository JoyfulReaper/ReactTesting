import React, {useState} from "react";

const Practice2 = () => {
  /*
   * 1. Create homePoints and awayPoints in state using hooks
   * 2. Display the points for the home and away teams
   * 3. Add a button for each team to add one point
   * 4. Add an onClick event to the Reset button that sets both points to zero
   */

  const [homePoints, setHomePoints] = useState(0);
  const [awayPoints, setAwayPoints] = useState(0);

  return (
    <>
      <h1>Scoreboard</h1>
      <div
        style={{
          display: `flex`,
          maxWidth: `300px`,
          justifyContent: `space-between`,
        }}
      >
        <h2>Home: {homePoints}</h2>
        <h2>Away: {awayPoints}</h2>
      </div>
      <p>
        <button onClick={() => setHomePoints(homePoints + 1)}>Home Score</button>
        <button onClick={() => setAwayPoints(awayPoints + 1)}>Away Score</button>
        <button onClick={() => {
          setHomePoints(0);
          setAwayPoints(0);
        }}>Reset Points</button>
      </p>
    </>
  );
};

export default Practice2;
