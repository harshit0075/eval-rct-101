import data from "../../submissionData.json"; // do not create this file
// const data = [
// 	{
// 		submission_link: "http://localhost:3000",
// 		id: "manish-local",
// 		json_server_link: "http://localhost:8080",
// 	},
// ];

data.forEach(({ submission_link: url, id, json_server_link: server_url }) => {
	describe("Evaluation RCT-211-B120-E2", function () {
		let acc_score = 1;

		beforeEach(() => {
			cy.visit(url);
			// cy.window().its("store").should("exist");
			if (url.charAt(url.length - 1) != "/") {
				url = url + "/";
			}
		});

		it(`Check Initial structure of authProvider Structure`, () => {
			cy.window()
				.its("store.isAuth")
				.should("eq", false)
				.then(() => {
					acc_score += 1;
				});
		});

		it(`Check home page with proper text is visible or not`, () => {
			cy.url().should("eq", url);

			cy.get('[data-cy="welcome-text"]').should(
				"have.text",
				"Welcome to Home page , click here to login",
			);

			cy.get('[data-cy="welcome-text"] a').click();
			cy.url().should("eq", url + "login");

			cy.then(() => (acc_score += 1));
		});

		it(`should display proper error message for wrong email `, () => {
			cy.intercept("GET", "**/users", { fixture: "users.json" }).as("users");
			cy.visit(url + "login");

			cy.get('[data-cy="login-email"]').should(
				"have.attr",
				"placeholder",
				"Enter Email",
			);
			cy.get('[data-cy="login-password"]').should(
				"have.attr",
				"placeholder",
				"Enter Password",
			);

			cy.get('[data-cy="login-email"]').type("wrong@gmail.com");
			cy.get('[data-cy="login-password"]').type("password123");

			cy.get('[data-cy="formSubmit-btn"]').submit();
			cy.wait("@users").then((res) => {
				console.log(res, "res");
			});
			cy.get('[data-cy="err-text"]').should("contain", "Email doesn't exists!");

			cy.then(() => (acc_score += 1));
		});

		it(`should display proper error message for wrong password`, () => {
			cy.intercept("GET", "**/users", { fixture: "users.json" }).as("users");
			cy.visit(url + "login");

			cy.get('[data-cy="login-email"]').should(
				"have.attr",
				"placeholder",
				"Enter Email",
			);
			cy.get('[data-cy="login-password"]').should(
				"have.attr",
				"placeholder",
				"Enter Password",
			);

			cy.get('[data-cy="login-email"]').type("tommy@example.com");
			cy.get('[data-cy="login-password"]').type("password123");

			cy.get('[data-cy="formSubmit-btn"]').submit();
			cy.wait("@users");
			cy.get('[data-cy="err-text"]').should("contain", "Incorrect Password!");

			cy.then(() => (acc_score += 1));
		});

		it(`should be abe to login with corect credentials`, () => {
			cy.intercept("GET", "**/users", { fixture: "users.json" }).as("users");
			cy.visit(url + "login");

			cy.get('[data-cy="login-email"]').should(
				"have.attr",
				"placeholder",
				"Enter Email",
			);
			cy.get('[data-cy="login-password"]').should(
				"have.attr",
				"placeholder",
				"Enter Password",
			);

			cy.get('[data-cy="login-email"]').type("tommy@example.com");
			cy.get('[data-cy="login-password"]').type("tommy123");

			cy.get('[data-cy="formSubmit-btn"]').submit();
			cy.wait("@users");
			cy.window().its("store.isAuth").should("eq", true);
			cy.url().should("eq", url + "dashboard");

			cy.then(() => (acc_score += 1));
		});

		it(`should display Login link in navbar for Homepage and once login Logout link should be visible`, () => {
			cy.visit(url);
			cy.window().its("store.isAuth").should("eq", false);
			cy.wait(500)
			cy.get('[data-cy="navbar-logout-button"]').should("not.be.exist");
			cy.get('[data-cy="navbar-login-button"]').should("be.exist");

			cy.intercept("GET", "**/users", { fixture: "users.json" }).as("users");
			cy.visit(url + "login");

			cy.get('[data-cy="login-email"]').should(
				"have.attr",
				"placeholder",
				"Enter Email",
			);
			cy.get('[data-cy="login-password"]').should(
				"have.attr",
				"placeholder",
				"Enter Password",
			);

			cy.get('[data-cy="login-email"]').type("tommy@example.com");
			cy.get('[data-cy="login-password"]').type("tommy123");

			cy.get('[data-cy="formSubmit-btn"]').submit();
			cy.wait("@users");
			cy.window().its("store.isAuth").should("eq", true);
			cy.url().should("eq", url + "dashboard");

			cy.get('[data-cy="navbar-logout-button"]').should("be.exist");
			cy.get('[data-cy="navbar-login-button"]').should("not.be.exist");

			cy.then(() => (acc_score += 2));
		});

		it(`Check the invalid route `, () => {
			cy.visit(url + "invalidURL");
			cy.get('[data-cy="invalid-path-message"]').should(
				"have.text",
				"404,Page not Found.",
			);
			cy.get("h1").should("have.text", "404,Page not Found.");

			cy.then(() => {
				acc_score += 1;
			});
		});

		it(`Check if the user is redirected to login page before visiting /dashboard and /dashboard/1, without authentication`, () => {
			cy.visit(url + "dashboard");
			cy.window().its("store.isAuth").should("eq", false);

			cy.url().should("eq", url + "login");

			cy.visit(url + "dashboard/1");
			cy.window().its("store.isAuth").should("eq", false);

			cy.url().should("eq", url + "login");

			cy.then(() => (acc_score += 1));
		});

		it(`Check if /dashboard working fine`, () => {
			cy.visit(url);

			cy.intercept("GET", "**/users", { fixture: "users.json" }).as("users");
			cy.intercept("GET", "**/userDetails", { fixture: "userDetails.json" }).as(
				"userDetails",
			);
			cy.visit(url + "login");

			cy.get('[data-cy="login-email"]').should(
				"have.attr",
				"placeholder",
				"Enter Email",
			);
			cy.get('[data-cy="login-password"]').should(
				"have.attr",
				"placeholder",
				"Enter Password",
			);

			cy.get('[data-cy="login-email"]').type("tommy@example.com");
			cy.get('[data-cy="login-password"]').type("tommy123");

			cy.get('[data-cy="formSubmit-btn"]').submit();
			cy.wait("@users");
			cy.window().its("store.isAuth").should("eq", true);
			cy.url().should("eq", url + "dashboard");

			// cy.visit(url+"dashboard");
			cy.wait("@userDetails");
			cy.get('[data-cy="user-list"] tr').should("have.length", 10);

			// cy.request("GET", `${server_url}/userDetails`).then(({ body }) => {
			//  console.log(body)
			cy.fixture("userDetails").then((users) => {
				users.forEach((singleUser) => {
					cy.get(`[data-cy=singleUser-${singleUser.id}]`);
					cy.get('[data-cy="user-name"]').contains(singleUser.name);
					cy.get('[data-cy="user-email"]').contains(singleUser.email);
					cy.get('[data-cy="user-phone"]').contains(singleUser.phone);
				});
			});
			// });

			cy.then(() => (acc_score += 2));
		});

		it(`Check if /dashboard/:id working fine`, () => {
			cy.visit(url);

			cy.intercept("GET", "**/users", { fixture: "users.json" }).as("users");
						cy.intercept("GET", "**/userDetails", { fixture: "userDetails.json" }).as("userDetails");

			cy.intercept("GET", "**/userDetails/1", {
				fixture: "singleUser.json",
			}).as("userDetails/1");
			cy.visit(url + "login");

			cy.get('[data-cy="login-email"]').should(
				"have.attr",
				"placeholder",
				"Enter Email",
			);
			cy.get('[data-cy="login-password"]').should(
				"have.attr",
				"placeholder",
				"Enter Password",
			);

			cy.get('[data-cy="login-email"]').type("tommy@example.com");
			cy.get('[data-cy="login-password"]').type("tommy123");

			cy.get('[data-cy="formSubmit-btn"]').submit();
			cy.wait("@users");
			cy.window().its("store.isAuth").should("eq", true);
			cy.url().should("eq", url + "dashboard");
			cy.wait("@userDetails")
			// cy.visit(url+"dashboard");
			cy.get(`[data-cy="user-name"]`).eq(0).click();

			cy.wait("@userDetails/1");

			cy.fixture("singleUser").then((singleUser) => {
				//  console.log(body)

				cy.get('[data-cy="singleUser-name"]').contains(singleUser.name);
				cy.get('[data-cy="singleUser-email"]').contains(singleUser.email);
				cy.get('[data-cy="singleUser-phone"]').contains(singleUser.phone);
				cy.get('[data-cy="singleUser-address"]').contains(singleUser.address);
				cy.get('[data-cy="singleUser-city"]').contains(singleUser.city);
				cy.get('[data-cy="singleUser-state"]').contains(singleUser.state);
				cy.get('[data-cy="singleUser-zip"]').contains(singleUser.zip);
			});

			// cheacking the back button
			cy.url().should("eq", url + "dashboard/1");
			cy.get('[data-cy="back-to-home-btn"]').click();
			cy.url().should("eq", url + "dashboard");

			cy.then(() => (acc_score += 2));
		});

		it("check the logout button should work fine", () => {
			cy.visit(url);

			cy.intercept("GET", "**/users", { fixture: "users.json" }).as("users");
			cy.visit(url + "login");

			cy.get('[data-cy="login-email"]').should(
				"have.attr",
				"placeholder",
				"Enter Email",
			);
			cy.get('[data-cy="login-password"]').should(
				"have.attr",
				"placeholder",
				"Enter Password",
			);

			cy.get('[data-cy="login-email"]').type("tommy@example.com");
			cy.get('[data-cy="login-password"]').type("tommy123");

			cy.get('[data-cy="formSubmit-btn"]').submit();
			cy.wait("@users");
			cy.window().its("store.isAuth").should("eq", true);

			// cheacking logout button functionality

			cy.url().should("eq", url + "dashboard");
			cy.get('[data-cy="navbar-logout-button"]').click();
			cy.window().its("store.isAuth").should("eq", false);
			cy.url().should("eq", url);

			cy.then(() => (acc_score += 1));
		});

		// it(`generate score`, () => {
		// 	console.log("final score:", acc_score);
		// 	////////////// this should not be chnages
		// 	let result = {
		// 		id,
		// 		marks: Math.ceil(acc_score),
		// 	};
		// 	result = JSON.stringify(result);
		// 	cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
		// 		if (err) {
		// 			console.error(err);
		// 		}
		// 	});
		// 	//////////////////
		// });
		after(() => {
			let result = {
				id,
				marks: Math.ceil(acc_score),
			};
			result = JSON.stringify(result);
			cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
				if (err) {
					console.error(err);
				}
			});
		});
	});
});
