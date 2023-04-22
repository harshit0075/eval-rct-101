export const AuthContextProvider = () => {
	// make sure making state as isAuth only.

	// dont change anything here manupulate providerState
	let providerState = { isAuth };

	if (window.Cypress) {
		window.store = providerState;
	}

	return <AuthContext.Provider value={providerState}></AuthContext.Provider>;
};
