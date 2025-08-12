import { greet } from "@my-workspace/server";
import "./index.css";

function App() {
  return (
    <div className="App">
      <h1>{greet()}</h1>
      <p>Welcome to the Vite React app!</p>
    </div>
  );
}

export default App;
