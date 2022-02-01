import "./UserHome.scss";

import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import imageIcon from "../../assets/icons/image.svg";
import playIcon from "../../assets/icons/youtube.svg";
import collectionIcon from "../../assets/icons/collection.svg";
import noVideoImg from "../../assets/images/no-video.svg";
import noPhotoImg from "../../assets/images/no-photo.svg";
import noCollectImg from "../../assets/images/no-collection.svg";

import PhotoFrame from "../PhotoFrame";
import VideoFrame from "../VideoFrame";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class UserHome extends Component {
    state = {
        user: null,
        content: "photos",
    };

    getUserData(id) {
        axios
            .get(`${API_URL}/users/${id}`)
            .then((response) => {
                this.setState({ user: response.data });
            })
            .catch((_err) => {});
    }

    componentDidMount() {
        const id = this.props.userId;
        this.getUserData(id);
    }

    toggleContent(contentType) {
        this.setState({ content: contentType });
    }

    sortCategories() {
        let categories = [];
        let categoriesData = {};
        let userPhotos = this.state.user.photos;
        let userTutorials = this.state.user.tutorials;

        userPhotos.forEach((photo) => {
            if (!categories.includes(photo.category)) {
                categories.push(photo.category);
            }
        });
        userTutorials.forEach((tutorial) => {
            if (!categories.includes(tutorial.category)) {
                categories.push(tutorial.category);
            }
        });

        categories.forEach((category) => {
            categoriesData[category] = { photos: [], tutorials: [] };
            categoriesData[category].photos = userPhotos.filter(
                (photo) => photo.category === category
            );
            categoriesData[category].tutorials = userTutorials.filter(
                (tutorial) => tutorial.category === category
            );
        });
        return categoriesData;
    }

    favoriteHandler = (event, url, contentType, category) => {
        event.preventDefault();
        const obj = {
            user_id: this.state.user.id,
            url: url,
            category: category,
        };
        axios
            .post(`${API_URL}/${contentType}`, obj)
            .then((_response) => {
                this.getUserData(this.state.user.id);
            })
            .catch((err) => console.log(`Not saved ${err}`));
    };

    contentRender() {
        let arr = [];
        let noImg = null;
        let link = null;
        let linkText = null;
        let imgClass = null;
        if (this.state.content === "photos") {
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
        } else if (this.state.content === "collection") {
            arr = this.sortCategories();
            noImg = noCollectImg;
            link = "/inspire";
            linkText = "Inspire";
            imgClass = "nothing-display__image";
        }
        if (arr.length === 0 || arr === {}) {
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
        } else if (this.state.content === "photos") {
            return (
                <div className="image-grid">
                    {this.state.user.photos.map((photo) => {
                        return (
                            <PhotoFrame
                                url={photo.url}
                                description={photo.id}
                                category={photo.category}
                                contentType={"photos"}
                                favoriteHandler={this.favoriteHandler}
                                key={photo.id}
                            />
                        );
                    })}
                </div>
            );
        } else if (this.state.content === "tutorials") {
            return (
                <div className="video-grid">
                    {this.state.user.tutorials.map((tutorial) => {
                        return (
                            <VideoFrame
                                videoId={tutorial.id}
                                url={tutorial.url}
                                title={tutorial.title}
                                favoriteHandler={this.favoriteHandler}
                                key={tutorial.id}
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
                            className={
                                this.state.content === "photos"
                                    ? "user-home__menu-item user-home__menu-item--active"
                                    : "user-home__menu-item"
                            }
                            onClick={() => {
                                this.toggleContent("photos");
                            }}
                        >
                            <img
                                src={imageIcon}
                                className="user-home__menu-icon"
                            />
                            <p className="user-home__menu-label">Images</p>
                        </div>
                        <div
                            className={
                                this.state.content === "tutorials"
                                    ? "user-home__menu-item user-home__menu-item--active"
                                    : "user-home__menu-item"
                            }
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
                        <div
                            className={
                                this.state.content === "collection"
                                    ? "user-home__menu-item user-home__menu-item--active"
                                    : "user-home__menu-item"
                            }
                            onClick={() => {
                                this.toggleContent("collection");
                            }}
                        >
                            <img
                                src={collectionIcon}
                                className="user-home__menu-icon"
                            />
                            <p className="user-home__menu-label">Collection</p>
                        </div>
                    </div>
                </div>
                <div className="user-home__content">{this.contentRender()}</div>
            </div>
        );
    }
}

export default UserHome;
