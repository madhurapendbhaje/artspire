import "./Header.scss";

import logo from "../../assets/logo/artspire.svg";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

class Header extends Component {
    state = {
        isAuthenticated: false,
        user: null,
    };

    componentDidMount() {
        // Check auth
        axios
            .get("http://localhost:8080/users/check-auth", {
                withCredentials: true,
            })
            .then((res) => {
                this.setState({
                    isAuthenticated: true,
                    user: res.data,
                });
            })
            .catch(() => {
                this.setState({
                    isAuthenticated: false,
                });
            });
    }

    signOut = () => {
        // Change location to /logout server route while passing it
        // the URL for redirecting back to a client
        const url = `${window.location.protocol}//${window.location.host}`;
        window.location = `http://localhost:8080/users/logout?from=${url}`;
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <header className="header">
                    <NavLink to="/" className="header__logo-link">
                        <img src={logo} alt="Logo" className="header__logo" />
                    </NavLink>
                    <nav className="header__navigation">
                        <NavLink
                            to="/inspire"
                            className="header__navigation-link"
                            activeClassName="header__navigation-link--active"
                        >
                            Inspire Me
                        </NavLink>
                        <NavLink
                            to="/tutorials"
                            className="header__navigation-link"
                            activeClassName="header__navigation-link--active"
                        >
                            Tutorials
                        </NavLink>
                        <button
                            className="header__navigation-logout"
                            onClick={this.signOut}
                        >
                            Log Out
                        </button>
                    </nav>
                </header>
            );
        } else {
            return (
                <header className="header">
                    <NavLink to="/" className="header__logo-link">
                        <img src={logo} alt="Logo" className="header__logo" />
                    </NavLink>
                    <nav className="header__navigation">
                        <NavLink
                            to="/users/login"
                            className="header__navigation-login"
                        >
                            Log In
                        </NavLink>
                    </nav>
                </header>
            );
        }
    }
}

export default Header;
