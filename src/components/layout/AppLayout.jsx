import { Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <div>
        <nav></nav>
        <Outlet />
        <footer></footer>
      </div>
    </>
  );
}

export default AppLayout;
