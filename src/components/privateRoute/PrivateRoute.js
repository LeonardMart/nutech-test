import { Navigate, Outlet } from "react-router-dom";
import Layout from "../../pages";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
