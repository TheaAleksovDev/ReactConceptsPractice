import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import WorkBuddies from "./components/WorkBuddies/WorkBuddies";
import { BuddiesContextProvider } from "./components/BuddiesContext";
import { FormContextDisabledProvider } from "./components/FormContext";
function App() {
  return (
    <div className="App">
      
      <BuddiesContextProvider>
        <FormContextDisabledProvider>
        <Tasks />
        </FormContextDisabledProvider>
        <WorkBuddies />
      </BuddiesContextProvider>
    </div>
  );
}

export default App;
