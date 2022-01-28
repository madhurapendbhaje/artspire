import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

class Protected extends Component {
    state = {
        isAuthenticating: true,
        isAuthenticated: false,
        user: null,
    };

    componentDidMount() {
        // Send an Auth check request to the server
        // don't forget to set axios to send requests withCredentials
        // it allows for cookies to be passed to backend
        axios
            .get(`http://localhost:8080/users/check-auth`, {
                withCredentials: true,
            })
            .then((res) => {
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: true,
                    user: res.data,
                });
            })
            .catch(() => {
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: false,
                });
            });
    }
    render() {
        const { component: Component, ...rest } = this.props;
        // Return a Route with all original props passed to it
        // and a custom render prop that waits for component to
        // finish authenticating and for successful auth
        // render component and also pass user object provided by server as a prop
        // otherwise redirect back to login page while passing it
        // a current route so it can redirect back to page you came from
        return (
            <Route
                {...rest}
                render={(props) => {
                    // While authenticating, don't show anything
                    // alternatively this could be a loading indicator
                    if (this.state.isAuthenticating) return null;
                    return this.state.isAuthenticated ? (
                        <Component user={this.state.user} {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/users/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                }}
            />
        );
    }
}

export default Protected;
