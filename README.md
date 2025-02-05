# Recipe App

This Recipe App allows users to register, log in, browse, search, and manage recipes. The app supports CRUD (Create, Read, Update, Delete) operations for recipes and provides personalized user experiences, such as viewing a profile and saving favorite recipes.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [API](#api)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and login
- CRUD operations for recipes
- Profile management
- Search functionality to filter recipes by name or category
- Responsive design

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm (v6+)

## Dependencies
- React (v18+)
- React Router DOM (v6+)
- FontAwesome (for icons)
- json-server (for mock backend)

## Installation

1. **Create the repository:**
  on terminal ,run the following
  npx create-react-app online-recipe-app
  cd online-recipe-app

**Install dependencies:**
npm install -g json-server

**Set up json-server for the mock backend:**
npm install -g json-server

**Run the mock server:**
npx json-server --watch src/database/db.json --port 5000

**Start the React app:**
npm start


## Usage

Home Page: Displays a welcome message and allows users to search and browse recipes.
Recipe List: Shows all recipes, with options to add, edit, or delete recipes.
Registration: Allows new users to sign up.
Login: Allows existing users to log in.
Profile Page: Displays the user's profile and favorite recipes. Click on the profile icon to view your profile details.

## Components
**App.js**
The main component that manages routes and renders different pages based on user authentication.

**HomePage.js**
Manages the homepage layout, including search functionality and recipe browsing.
Uses useEffect to fetch user data and recipes from db.json.

**RecipeList.js**
Displays a list of recipes with options to add, edit, or delete recipes.
Implements CRUD operations using fetch.

**Navbar.js**
A navigation bar component included on pages where users are logged in.
Button.js
A reusable button component used across different pages for actions like login, register, etc.

**RecipeCard.js**
Displays individual recipe details and supports viewing full recipe details upon login.

## API

The app uses json-server to mock a REST API, which is defined in db.json.

**GET /Recipe**: Fetches all recipes.
**POST /Recipe**: Adds a new recipe.
**PUT /Recipe/**: Updates a recipe by ID.
**DELETE /Recipe/**: Deletes a recipe by ID.
**GET /users/**: Fetches user data by ID.

## Styling

The app uses inline styles and a Recipelist.css file to style components. The color scheme includes:
 Blue
Yellow
white