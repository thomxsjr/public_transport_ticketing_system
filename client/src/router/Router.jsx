import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Dashboard from "../pages/Dasboard";
import Profile from "../pages/Profile"


export default function RouterRoutes() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}
					/>
					<Route
						path="/signup"
						element={<SignUp />}
					/>

					<Route
						path="/signin"
						element={<SignIn />}
					/>

					<Route
						path="/dashboard"
						element={<Dashboard />}
					/>

					<Route
						path="/profile"
						element={<Profile />}
					/>

					<Route
						path="*"
						element={<Navigate to="/" />}
					/>
				</Routes>
			</Router>
		</>
	);
}

