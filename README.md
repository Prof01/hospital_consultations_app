# Hospital Consultations App

# Getting Started
Please Read through Below to understand how the app is Run.

## Technologies used

### Backend

1. Node/Express - as the Backend Server

2. MongoDB - as the database with Mongoose for creating Models

3. JSON Web Tokens (JWT) - for managing Authention

4. bcryptjs - for hashing user passwords to the database

### Front-End

1. React.js - as a popular client-side library for building single page applications

2. Redux - Serving as State Management tool for React App

3. Bootstrap - For Styling the various aspects of the App

4. Reactstrap - A Technology built on Bootstrap which is clean to use as JSx Components


### Requirements for Running the App

You MUST have the following installed

1. Node.js

2. MongoDB - Install locally or Hosted somewhere in the cloud

## How to Run the App

1. Clone and Extract the repository to your local Machine

2. Open powershell and cd to the Application directory

3. Run `npm install` to install all dependencies for the App

4. And also `npm run client-install` to install the client side dependencies.

### Configurations

4. Open the `.env` file and Configure the following:

- `mongo_URI = ` - Paste in the uri link of your database

- `jwtSecret = ` - Type in your Secret token for encryption - It should be at least 20 may be for better security.

5. In the project directory, you can run:

### `npm run dev`

To Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`BRAVO!` - You can start using the app

### `NOTE:` 
- The Above command will start the Backend Server and the Front-End Server

#### Run `npm run server` 
- To start ONLY the Backend Server
at `http:localhost:5000`

OR 
#### Run `npm run client` 
- To start ONLY the Front-End Server
at `http:localhost:3000`