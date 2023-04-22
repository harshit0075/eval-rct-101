import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { AllRoutes } from "./Routes/Routes";

function App() {
	// DO NOT CHANGE/MODIFY this app-structure here
	return (
		<div data-testid="users-app">{/* import Navbar and AllRoutes show */}
		
		<BrowserRouter>
		<Navbar/>
		<AllRoutes/>
		</BrowserRouter>
		
		</div>
	);
}

export default App;
