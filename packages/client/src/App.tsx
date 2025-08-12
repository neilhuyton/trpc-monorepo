import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";
import "./index.css";

export default function App() {
  return <RouterProvider router={router} />;
}
