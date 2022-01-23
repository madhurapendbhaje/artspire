import React, { Component } from "react";
import axios from "axios";

class AuthButton extends Component {
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
        // Display user name and sign out button for logged in user
        // or a "not logged in" message
        return (
            this.state.isAuthenticated && (
                <p>
                    <img
                        height="25"
                        src={this.state.user.photos[0].value}
                        alt={this.state.user.displayName}
                    />
                    Welcome, {this.state.user.displayName}!{" "}
                    <button onClick={this.signOut}>Sign out</button>
                </p>
            )
        );
    }
}

export default AuthButton;
