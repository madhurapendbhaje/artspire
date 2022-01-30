import "./Header.scss";

import logo from "../../assets/logo/artspire.svg";
import { NavLink, Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

import userLogo from "../../assets/icons/user-solid.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import upArrow from "../../assets/icons/angle-up-solid.svg";
import downArrow from "../../assets/icons/angle-down-solid.svg";

class Header extends Component {
    state = {
        isAuthenticated: false,
        user: null,
        showDropdown: false,
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

    toggleMenu = () => {
        this.setState((prevState) => ({
            showDropdown: !prevState.showDropdown,
        }));
    };

    dropdownMenu() {
        return (
            <div className="profile">
                <div className="profile__image-container">
                    <img
                        src={this.state.user.picture}
                        className="profile__image"
                    />
                </div>
                {this.state.showDropdown ? (
                    <img
                        src={upArrow}
                        className="profile__icon"
                        onClick={this.toggleMenu}
                    />
                ) : (
                    <img
                        src={downArrow}
                        className="profile__icon"
                        onClick={this.toggleMenu}
                    />
                )}
                {this.state.showDropdown && (
                    <div className="profile__menu">
                        <Link
                            className="profile__menu-item"
                            to="/users"
                            onClick={this.toggleMenu}
                        >
                            <img
                                src={userLogo}
                                alt="User logo"
                                className="profile__menu-item-icon"
                            />
                            <p className="profile__menu-item-text">
                                My Profile
                            </p>
                        </Link>
                        <Link
                            className="profile__menu-item"
                            onClick={this.signOut}
                        >
                            <img
                                src={logoutIcon}
                                alt="Logout icon"
                                className="profile__menu-item-icon"
                            />
                            <p className="profile__menu-item-text">Logout</p>
                        </Link>
                    </div>
                )}
            </div>
        );
    }

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
                        {this.dropdownMenu()}
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
