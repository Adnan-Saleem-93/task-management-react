import { Route, Routes } from "react-router-dom";
import "./App.css";
import Notify from "./components/Notify";
import PublicRoutes from "./components/Public-Routes";
import ProtectedRoutes from "./components/Protected-Routes";
import Auth from "./views/auth";
import Tasks from "./views/tasks";

function App() {
	return (
		<>
			<Routes>
				<Route element={<PublicRoutes />}>
					<Route name="auth" path="/auth" element={<Auth />} />
				</Route>
				<Route element={<ProtectedRoutes />}>
					<Route name="task" path="/tasks" element={<Tasks />} />
				</Route>
				<Route name="not-found" path="*" element={<Auth />} />
			</Routes>
			<Notify />
		</>
	);
}

export default App;
