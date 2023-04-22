
# React Routing Users Dashboard 
## Maximum Marks - 15

### Submission Instructions [Please note]

- The Submission should not contain spaces, for example,/rct-101 folder/eval will not work
- Do not push node_modules and package_lock.json to GitHub

```
 ✅ able to submit the app - 1 mark ( minimum score )
 ✅ Check Initial structure of authProvider Structure  - 1 mark
 ✅ Check home page with proper text is visible or not - 1 mark
 ✅ should display proper error message for wrong email - 1 mark
 ✅ should display proper error message wrong password - 1 mark
 ✅ should be abe to login with corect credentials - 1 mark
 ✅ should display Login link in navbar for Homepage and once login Logout link should be visible - 2 marks
 ✅ Check the invalid route -1 marks
 ✅ Check if the user is redirected to login page before visiting /dashboard and /dashboard/1, without authentication - 1 mark
 ✅ Check if /dashboard working fine- 2 mark
 ✅ Check if /dashboard/:id working fine- 2 mark
 ✅ check the logout button should work fine - 1 mark

```

## Installation

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- please make sure you do not push package-lock.json

- Download and unzip the boilerplate file and then copy the "**contents**" of the unzipped file in the Masai Folder.
- Navigate to the Masai Folder, in VS Code.
- Run the following commands inside,
- `npm install --engine-strict`
- `npm start`
- `npm run server` -> to start the json-server
- **_Note_**:

1. Libraries need to be installed by yourself
2. Make sure that the json-server is up and running at port 8080
3. Create a .env file. Include `REACT_APP_JSON_SERVER_PORT=8080` in it
4. You need to restart the react server once the env file is updated.
5. Use `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}` as the json-server url

### Steps

### Understanding Component Structure

- App
  - Navbar
  - AllRoutes
    - Path: “/”, Page: Home.jsx (Public Route)
    - Path: “/login”, Page: Login.jsx (Public Route)
    - Path: “/dashboard”, Page: UsersDashboard.jsx (private Route, accessible after logging in)
    - Path: “/dashboard/:id”, Page: SingleUser.jsx (private Route, accessible after logging in)

### Context API

- Store
  - AuthContext.jsx

**NOTE**: Context API is mandatory for this application

1. Use the `providerState` as value in the context file.
2. Some of the boilerplate is provided. You are expected to write all the other remaining parts (functions, logic, etc).do not remove those.
3. Make sure Context API is connected with your React application properly, and you have access to the Context API data.

### JSON Data:

- userList.json file is included in the boilerplate zip file, with the initial users data. **Do not overwrite/modify this data**

### Features to build:

**Functionalities component-wise**

- Home (public route)
  - home should have `Welcome to Home page , click here to login` text
  - on clicking `click here` link user should navigate to login page
- Navbar
  - if not logging in,home page navbar should have a button with Login link.
  - if logging in dashboard page navbar should have a button with a Logout link.
- App
  - import the navbar component into the App component
  - import Routes component into App component
- Routes
  - Keep all routes inside this component
  - handle the not found page as well for invalid routes. - display an `h1` tag with the message `404,Page not Found.` tag should have `data-cy="invalid-path-message"` attribute.
- Private routes
  - write the logic to navigate the route only when logged in
- Login.jsx
  - it should have a form with input fields
    - email
      - placeholder = "Enter Email"
    - password
      - placeholder = "Enter Password"
    - an input with type as submit and value submit
    - on submit make a get request to `/users` and check if the entered details match with the data fetched (use email and password from users data given in usersList.json for login)
    - if the email doesn't exist
      - `Email doesn't exists!` message should be shown below the login form in h3 tag with data-cy = "err-text"
    - if the email exists but the password didn't match
      - `Incorrect Password!` should be shown below the login form in h3 tag with data-cy = "err-text"
    - If both match handle the `isAuth` using context and navigate the user to `/dashboard`
- UserDashboard.jsx
  - on landing this page make a request to `/userDetails` and display the details in a table with the following details
    - `sl.no, name, email, phone`.
- SingleUser.jsx
  - On clicking the `name` of the user navigate to `/dashboard/:id` and display the rest of the details.
  - keep a button `"Back to Dashboard"` button on clicking navigate to the dashboard page.
- Logout

  - keep a link in the userDashboard navbar.
  - on clicking it handles isAuth in AuthContext and makes it false.
  - logout should navigate to the home page.

- Home![](https://i.imgur.com/Lm0zgKI.png)
- Login![](https://i.imgur.com/RZ4vPs1.png)
- Dashboard![](https://i.imgur.com/ASaL0bj.png)
- Dashboard/:id![](https://i.imgur.com/uCHsh6p.png)

### General Instructions:

- Do not remove `data-testid=’xxx’` from anywhere inside the code. They are the test inputs, removing them, may lead to low scores.
- Do not change the current folder structure, and names of components provided.
- Only use the data present in the db.json file, and do not modify the data in the json file.

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug before itself
- we also request you not to just submit it last minute
- try to keep one submission at a time
