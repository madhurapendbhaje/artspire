import "./UserHome.scss";

import { Component } from "react";
import axios from "axios";

import imageIcon from "../../assets/icons/image.svg";
import playIcon from "../../assets/icons/youtube.svg";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class UserHome extends Component {
    state = {
        user: null,
        content: "images",
    };

    componentDidMount() {
        const id = this.props.userId;
        axios
            .get(`${API_URL}/users/${id}`)
            .then((response) => {
                this.setState({ user: response.data });
            })
            .catch((err) => {});
    }

    toggleContent(contentType) {
        this.setState({ content: contentType });
    }

    contentRender(contentType) {
        if (contentType === "images") {
            return (
                <div className="image-grid">
                    {this.state.user.photos.map((photo) => {
                        return (
                            <img
                                src={photo.url}
                                alt={photo.id}
                                className="image-grid__image"
                            />
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        if (!this.state.user) {
            return <p>Loading</p>;
        }
        return (
            <div className="user-home">
                <div className="user-home__panel">
                    <div className="user-home__profile-container">
                        <img
                            src={this.state.user.picture}
                            alt="User profile"
                            className="user-home__user-image"
                        />
                        <h2 className="user-home__name">
                            {this.state.user.first_name +
                                " " +
                                this.state.user.last_name}{" "}
                        </h2>
                        <p className="user-home__level">
                            {this.state.user.proficiency_level}
                        </p>
                    </div>
                    <div className="user-home__menu">
                        <div
                            className="user-home__menu-item user-home__menu-item--active"
                            onClick={() => {
                                this.toggleContent("images");
                            }}
                        >
                            <img
                                src={imageIcon}
                                className="user-home__menu-icon"
                            />
                            <p className="user-home__menu-label">Images</p>
                        </div>
                        <div className="user-home__menu-item">
                            <img
                                src={playIcon}
                                className="user-home__menu-icon"
                            />
                            <p className="user-home__menu-label">Tutorials</p>
                        </div>
                    </div>
                </div>
                <div className="user-home__content">
                    {this.contentRender(this.state.content)}
                </div>
            </div>
        );
    }
}

export default UserHome;
