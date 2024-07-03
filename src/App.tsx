import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import WorkBuddies from "./components/WorkBuddies/WorkBuddies";
import { BuddiesContextProvider } from "./components/BuddiesContext";

function App() {
  return (
    <div className="App">
      <BuddiesContextProvider>
        <Tasks />
        <WorkBuddies />
      </BuddiesContextProvider>
    </div>
  );
}

export default App;
