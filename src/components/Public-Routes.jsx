import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store";

const PublicRoutes = () => {
	const { email } = useStore((state) => state.auth);

	const isAuthenticated = email ? true : false; // check if user is authenticated

	// if user is already authenticated, redirect to tasks page
	return isAuthenticated ? <Navigate to="/tasks" replace /> : <Outlet />;
};

export default PublicRoutes;
