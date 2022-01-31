import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Protected from "./components/Protected";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import InspirePage from "./pages/InspirePage";
import ColorsPage from "./pages/ColorsPage";
import Tutorials from "./components/Tutorials";
import TutorialsPage from "./pages/TutorialsPage";

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <div className="app">
                    <Route exact path="/" component={HomePage} />
                    <Protected
                        path="/inspire/:photoId/colors"
                        component={ColorsPage}
                    />
                    <Protected exact path="/inspire" component={InspirePage} />
                    <Protected
                        exact
                        path="/tutorials"
                        component={TutorialsPage}
                    />
                    <Protected
                        path="/tutorials/:category"
                        component={Tutorials}
                    />
                    <Route path="/users/login" component={LoginPage} />
                    <Protected path="/users/profile" component={ProfilePage} />
                </div>
            </Router>
        );
    }
}
export default App;
