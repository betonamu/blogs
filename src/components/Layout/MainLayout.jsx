import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
