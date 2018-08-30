import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
// import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

// import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import Dashboard from './components/dashboard/Dashboard';
// import CreateProfile from './components/create-profile/CreateProfile';
// import EditProfile from './components/edit-profile/EditProfile';
// import AddExperience from './components/add-credentials/AddExperience';
// import AddEducation from './components/add-credentials/AddEducation';

import './App.css';

// Check for token
if (localStorage.jwtToken) {

  setAuthToken(localStorage.jwtToken);                // Set Auth token to header
  const decoded = jwt_decode(localStorage.jwtToken);  // Decode token and get user info
  store.dispatch(setCurrentUser(decoded));            // Set user is authenticated
  const currentTime = Date.now() / 1000;              // Check for expired token
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())                      // Logout user
    // store.dispatch(clearCurrentProfile())             // Clear current profile
    window.location.href = '/login';                  // Clear current profile redirect to login
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch> */}

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;