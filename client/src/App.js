import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthButton from "./components/AuthButton";
import LoginPage from "./components/LoginPage";
import UserProfile from "./components/UserProfile";
import Protected from "./components/Protected";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import InspirePage from "./pages/InspirePage";
import ColorsPage from "./pages/ColorsPage";
import Tutorials from "./components/Tutorials";

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <div className="app">
                    <Route exact path="/" component={HomePage} />
                    <Route
                        path="/inspire/:photoId/colors"
                        component={ColorsPage}
                    />
                    <Protected exact path="/inspire" component={InspirePage} />
                    <Protected
                        path="/tutorials/:category"
                        component={Tutorials}
                    />
                    <Route path="/users/login" component={LoginPage} />
                    <Protected path="/users/profile" component={ProfilePage} />
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
