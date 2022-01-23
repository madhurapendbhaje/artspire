import React, { Component } from "react";

class Login extends Component {
    login = () => {
        console.log(this.props.location);
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
            <div>
                <p>You must log in to view the page</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

export default Login;
