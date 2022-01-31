import "./UserHome.scss";

import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import imageIcon from "../../assets/icons/image.svg";
import playIcon from "../../assets/icons/youtube.svg";
import noVideoImg from "../../assets/icons/no-video.svg";
import noPhotoImg from "../../assets/icons/no-photo.svg";

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

    contentRender() {
        let arr = [];
        let noImg = null;
        let link = null;
        let linkText = null;
        let imgClass = null;
        if (this.state.content === "images") {
            arr = this.state.user.photos;
            noImg = noPhotoImg;
            link = "/inspire";
            linkText = "Inspire Me";
            imgClass = "nothing-display__image";
        } else if (this.state.content === "tutorials") {
            arr = this.state.user.tutorials;
            noImg = noVideoImg;
            link = "/tutorials";
            linkText = "Tutorials";
            imgClass =
                "nothing-display__image nothing-display__image--tutorial";
        }
        if (arr.length === 0) {
            return (
                <div className="nothing-display">
                    <img src={noImg} className={imgClass} />
                    <p className="nothing-display__caption">
                        Nothing saved yet, explore{" "}
                        <Link to={link} className="nothing-display__link">
                            {linkText}
                        </Link>{" "}
                        for some inspiration!{" "}
                    </p>
                </div>
            );
        } else {
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
            return <p>Loading..</p>;
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
                        <div
                            className="user-home__menu-item"
                            onClick={() => {
                                this.toggleContent("tutorials");
                            }}
                        >
                            <img
                                src={playIcon}
                                className="user-home__menu-icon"
                            />
                            <p className="user-home__menu-label">Tutorials</p>
                        </div>
                    </div>
                </div>
                <div className="user-home__content">{this.contentRender()}</div>
            </div>
        );
    }
}

export default UserHome;
