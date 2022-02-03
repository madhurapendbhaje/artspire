import "./LoginPage.scss";

import React, { Component } from "react";

import googleIcon from "../../assets/icons/google.svg";
import loginImage from "../../assets/images/login.svg";

class Login extends Component {
    login = () => {
        // Change location to /login server route while sending a redirect url
        // If user is coming from a page different than /, get the page they
        // are coming from, otherwise redirect to / after login
        const { from } = this.props.location.state || {
            from: { pathname: "/users" },
        };
        const url = `${window.location.protocol}//${window.location.host}${from.pathname}`;
        window.location = "http://localhost:8080/users/login";
    };

    render() {
        return (
            <div className="login">
                <div className="login__hero">
                    <div className="login__hero-container">
                        <p className="login__title">Log In to Artpsire</p>
                        <div className="login__sub-container">
                            <img
                                src={googleIcon}
                                alt="google logo"
                                className="login__logo"
                            />
                            <button
                                onClick={this.login}
                                className="login__button"
                            >
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
                <div className="login__artwork">
                    <img
                        src={loginImage}
                        alt="Login artwork"
                        className="login__artwork-image"
                    />
                </div>
            </div>
        );
    }
}

export default Login;
