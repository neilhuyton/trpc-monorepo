import { Link } from "@tanstack/react-router";

export function About() {
  return (
    <div className="App">
      <h1>About Page</h1>
      <p>
        This is the About page of the Weight Tracker app with tRPC and TanStack
        Router!
      </p>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
    </div>
  );
}
