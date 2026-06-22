import React, { useState, useEffect } from "react";

function App() {

  const [goal, setGoal] = useState("");
  const [savedGoal, setSavedGoal] = useState("");

  const [usage, setUsage] = useState({});

  useEffect(() => {

    chrome.storage.local.get(
      ["goal", "usage"],
      (result) => {
        if (result.goal) {
          setSavedGoal(result.goal);
        }

        if (result.usage) {
          setUsage(result.usage);
        }
      }
    );

  }, []);

  const saveGoal = () => {

    chrome.storage.local.set({
      goal: goal
    });

    setSavedGoal(goal);
    setGoal("");
  };

  return (
    <div className="container">

      <h2>Productivity Tracker</h2>

      <input
        value={goal}
        placeholder="Daily Goal"
        onChange={(e) =>
          setGoal(e.target.value)
        }
      />

      <button onClick={saveGoal}>
        Save Goal
      </button>

      <h3>Current Goal</h3>
      <p>{savedGoal}</p>

      <h3>Website Usage</h3>

      <ul>
        {Object.entries(usage).map(
          ([site, seconds]) => (
            <li key={site}>
              {site} - {seconds} sec
            </li>
          )
        )}
      </ul>

    </div>
  );
}

export default App;
