import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store";

const ProtectedRoutes = () => {
	const { email } = useStore((state) => state.auth);

	const isAuthenticated = email ? true : false; // check if user is authenticated

	// if user is not authenticated, redirect to login page
	return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
