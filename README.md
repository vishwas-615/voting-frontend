# Election Portal React App

A modern, responsive ReactJS application for digital voting and election management.

## Features

- **User Authentication**: Secure login and registration system
- **Location-based Elections**: View elections specific to your location
- **Digital Voting**: Cast votes for candidates in real-time
- **Live Results**: View live vote counts and candidate rankings
- **Responsive Design**: Beautiful Material-UI interface that works on all devices
- **Form Validation**: Complete form validation using Formik and Yup

## Tech Stack

- React 18
- Material-UI (MUI)
- React Router Dom
- Formik + Yup for form validation
- Axios for API calls
- Context API for state management

## Installation & Setup

1. **Clone or extract the project**
   ```bash
   cd election-portal-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Ensure your backend API is running on `http://localhost:3000`**

The app will open at `http://localhost:3001` (or next available port).

## API Endpoints Used

- `GET /locations/names` - Fetch all locations
- `POST /users` - User registration
- `POST /users/login` - User login
- `GET /elections?location={location}` - Get elections by location
- `GET /candidates?electionName={name}` - Get candidates by election
- `POST /votes` - Cast a vote
- `GET /votes/counts` - Get vote counts

## File Structure

```
src/
├── api/api.js              # API configuration and endpoints
├── components/
│   ├── Auth/
│   │   ├── Login.js        # Login component
│   │   └── Register.js     # Registration component
│   ├── Elections/
│   │   └── ElectionList.js # Election listing
│   ├── Candidates/
│   │   └── CandidateList.js # Candidate listing and voting
│   ├── Results/
│   │   └── Results.js      # Live results display
│   ├── Dashboard.js        # Main dashboard
│   └── Navbar.js           # Navigation bar
├── context/
│   └── AuthContext.js      # Authentication context
├── routes/
│   └── PrivateRoute.js     # Protected route component
├── App.js                  # Main app component
└── index.js                # App entry point
```

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Usage

1. **Register** with your details including location selection
2. **Login** to access the dashboard
3. **View Elections** available in your location
4. **Vote** for candidates in active elections
5. **Check Results** to see live vote counts and rankings

## Contributing

Feel free to submit issues and enhancement requests!
