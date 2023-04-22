import React from "react";
import {Link} from "react-router-dom"

export const Navbar = () => {
	return (
		<div>
			<h2>React user List</h2>
			<Link ></Link>
	<div>
				<button data-cy="navbar-logout-button">  LOGOUT</button>

				<button data-cy="navbar-login-button">LOGIN</button>
			</div>
		</div>
	);
};
