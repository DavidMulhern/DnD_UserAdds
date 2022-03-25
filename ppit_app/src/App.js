import './App.css';
// Importing functional components.
import ToDoList from './Components/ToDoList';
import Register from './Components/Register';
import Login from './Components/Login';
import UserPage from './Components/UserPage';
import List from './Components/List/List';
import AppX from './AppX';
// Imported bootstrap lib
import 'bootstrap/dist/css/bootstrap.min.css';
// Import navbar and nav for navigation.
import { Navbar, Nav } from 'react-bootstrap'
// Import Component, for routing purposes.
import React, { Component } from 'react';
// Import classes.
import { Home } from './Components/Home';
// import react router DOM for routing. Alias for BrowserRouter for easier use.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Need to place into classes/functions so app can render different pages/Components.
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/ToDoList">ToDoList</Nav.Link>
              <Nav.Link href="/Register">Register</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
              <Nav.Link href="/UserPage">User Page</Nav.Link>
              <Nav.Link href="/AppX">User Board</Nav.Link>
            </Nav>
          </Navbar>
          <br />
          
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/Register' component={Register} exact />
            <Route path='/ToDoList' component={ToDoList} exact />
            <Route path='/Login' component={Login} exact />
            <Route path='/UserPage' component={UserPage} exact />
            <Route path='/AppX' component={AppX} exact />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
