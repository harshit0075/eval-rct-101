 import {Routes,Route} from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../Components/Home";
import { Login } from "../Components/Login";
import { UsersDashboard } from "../Components/UsersDashboard";
import { SingleUser } from "../Components/SingleUser";

export const AllRoutes = () => {
	return <div>
<Routes>
	<Route path="/" element={<Home/>}></Route>
	<Route path="/login" element={<Login/>}></Route>
	
	<Route path="/dashboard" element={<UsersDashboard/>}></Route>
	<Route path="/dashboard/:`${id}`" element={<SingleUser/>}></Route>
	
</Routes>



	</div>;
};
