import React from 'react';
import './App.css';
import Tasks from './components/Tasks/Tasks';
import WorkBuddies from './components/WorkBuddies/WorkBuddies';

function App() {
  return (
    <div className="App">
      <Tasks/>
      <WorkBuddies/>
    </div>
  );
}

export default App;
