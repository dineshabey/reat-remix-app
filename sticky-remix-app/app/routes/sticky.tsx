import { Outlet } from "@remix-run/react";

export default function JokesRoute() {
  return (
    <div>
      <h1>S🤪TiCKY-APP</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
