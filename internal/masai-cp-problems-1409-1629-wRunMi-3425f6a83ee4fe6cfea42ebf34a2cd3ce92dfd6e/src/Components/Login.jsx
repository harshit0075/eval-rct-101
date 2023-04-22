import React from "react";

export const Login = () => {
	return (
		<div>
			<form data-cy="formSubmit-btn">
				<label>Email</label>

				<input type="email" data-cy="login-email" />

				<label>Password</label>
				<input type="password" data-cy="login-password" />

				<input type="submit" value={"submit"} />
			</form>
		</div>
	);
};
