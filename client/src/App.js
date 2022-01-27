import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthButton from "./components/AuthButton";
import LoginPage from "./components/LoginPage";
import UserProfile from "./components/UserProfile";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import InspirePage from "./pages/InspirePage";
import ColorsPage from "./pages/ColorsPage";
// import Tutorials from "./components/Tutorials";

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
                    <Route exact path="/inspire" component={InspirePage} />
                    {/* <Route path="/tutorials/:category" component={Tutorials} /> */}
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
