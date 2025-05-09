# restaurant_frontend

## Overview

This project is a mobile application built with React Native and Expo, designed to allow users to search for restaurant near them, it helps users get the nearBy restaurants.

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure that Node.js (version x.x.x) is installed. You can check your version by running:
   ```bash
   node -v

Expo CLI: If you're working with React Native using Expo, make sure the Expo CLI is installed. You can install it with:


## npm install -g expo-cli

React Native dependencies: Make sure all dependencies for the project are installed. Run:

# npm install

## To Test the application you have to run the backend docker-compose file 

**Command**: Docker-compose-up 
then you can start to test the application endpoint

# Architectural Decisions
## 1. Frontend: React Native (with Expo)
   Chose React Native for building a cross-platform mobile app (iOS and Android).

Expo was used for quick setup, easier testing, and building the app without needing to deal with native code directly

# Backend API:
## RESTful API was chosen for handling user requests and interacting with the database.

The API is designed to allow updates to user details (such as username, password, and email) using HTTP PUT requests.

# Future Improvement 
## Enhanced Error Handling:
Add better error messages and loading indicators to improve user experience during network delays or failures.

## Form Validation:
Add more robust form validation for inputs such as email and password fields.

## Testing:
Write unit and integration tests for both the frontend and backend to ensure the app behaves correctly and to catch regressions.

## Security:
Implement more secure ways to handle user authentication, such as JWT tokens or OAuth, to prevent session hijacking and to ensure better security for user data.

