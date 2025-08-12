import { trpc } from "../api/trpc";

export function Home() {
  const { data, isLoading, error } = trpc.greet.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <h1>{data}</h1>
      <p>Welcome to the Vite React app with tRPC!</p>
    </div>
  );
}
