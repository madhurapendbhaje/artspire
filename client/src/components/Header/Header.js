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
        showHamburger: false,
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

        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        this.setState({
            showHamburgerMenu: false,
        });
    };

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

    toggleHamburger = () => {
        this.setState((prevState) => ({
            showHamburger: !prevState.showHamburger,
        }));
    };

    hamburgerMenu() {
        return (
            <nav className="hamburger__navigation">
                <NavLink
                    to="/users/profile"
                    className="hamburger__navigation-link"
                    activeClassName="hamburger__navigation-link"
                    onClick={this.toggleHamburger}
                >
                    My Profile
                </NavLink>
                <NavLink
                    to="/inspire"
                    className="hamburger__navigation-link"
                    activeClassName="hamburger__navigation-link"
                    onClick={this.toggleHamburger}
                >
                    Inspire Me
                </NavLink>
                <NavLink
                    to="/tutorials"
                    className="hamburger__navigation-link"
                    activeClassName="hamburger__navigation-link"
                    onClick={this.toggleHamburger}
                >
                    Tutorials
                </NavLink>
            </nav>
        );
    }

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
                            to="/users/profile"
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
                        <div
                            className="profile__menu-item"
                            onClick={this.signOut}
                        >
                            <img
                                src={logoutIcon}
                                alt="Logout icon"
                                className="profile__menu-item-icon"
                            />
                            <p className="profile__menu-item-text">Logout</p>
                        </div>
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
                    {this.state.showHamburger && this.hamburgerMenu()}
                    <nav className="header__navigation">
                        <NavLink
                            to="/inspire"
                            className="header__navigation-link"
                            activeClassName="header__navigation-link"
                        >
                            Inspire Me
                        </NavLink>
                        <NavLink
                            to="/tutorials"
                            className="header__navigation-link"
                            activeClassName="header__navigation-link"
                        >
                            Tutorials
                        </NavLink>
                        {this.dropdownMenu()}
                    </nav>
                    <div
                        className="header__hamburger"
                        onClick={this.toggleHamburger}
                    >
                        <span className="header__bar"></span>
                        <span className="header__bar"></span>
                        <span className="header__bar"></span>
                    </div>
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
