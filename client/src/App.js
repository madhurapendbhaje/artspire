import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthButton from "./components/AuthButton";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import Favorites from "./components/Favorites";
import InspirePage from "./pages/InspirePage";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Route path="/inspire" component={InspirePage} />
                    {/* <AuthButton />
                    <ul>
                        <li>
                            <Link to="/users">Home Page</Link>
                        </li>
                        <li>
                            <Link to="/users/favorites">Protected Page</Link>
                        </li>
                    </ul>
                    <Route path="/users/login" component={LoginPage} />
                    <Route path="/users" component={HomePage} />
                    <Favorites
                        path="/users/favorites"
                        component={UserProfile}
                    /> */}
                </div>
            </Router>
        );
    }
}
export default App;
