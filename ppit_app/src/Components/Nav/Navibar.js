// Importing functional components.
import Register from '../Register';
import Login from '../Login';
import UserPage from '../UserPage';
import WhiteBoard from '../WhiteBoard/WhiteBoard';

// Imported bootstrap lib
import 'bootstrap/dist/css/bootstrap.min.css';
// Import navbar and nav for navigation.
import { Navbar, Nav } from 'react-bootstrap'
// Import Component, for routing purposes.
import React, { Component } from 'react';
// import react router DOM for routing. Alias for BrowserRouter for easier use.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppX from '../AppX';
import LandingPage from '../LandingPage';

// Need to place into classes/functions so app can render different pages/Components.
class Navibar extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="info" variant="dark">
            <Navbar.Brand href="/">KanSchan</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/AppX">Board</Nav.Link>
              {/* <Nav.Link href="/ToDoList">ToDoList</Nav.Link> */}
              <Nav.Link href="/Register">Register</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
              {/* <Nav.Link href="/UserPage">User Page</Nav.Link> */}
              <Nav.Link href="/WhiteBoard">WhiteBoard</Nav.Link>
            </Nav>
          </Navbar>
          <br />
          
          <Switch>
            <Route path='/' component={LandingPage} exact />
            <Route path='/AppX' component={AppX} exact />
            <Route path='/Register' component={Register} exact />
            <Route path='/Login' component={Login} exact />
            <Route path='/UserPage' component={UserPage} exact />
            <Route path='/WhiteBoard' component={WhiteBoard} exact />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Navibar;
