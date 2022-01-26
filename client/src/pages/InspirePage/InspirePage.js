import "./InspirePage.scss";

import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import heartIcon from "../../assets/icons/heart-solid.svg";
import Search from "../../components/Search";

const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class InspirePage extends Component {
    state = {
        photos: [],
        error: false,
        windowSize: null,
    };

    // https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
    /**
     *
     * @param {array} array     Array to be divided []
     * @param {integer} parts   No of subset the input array should be divided into Eg: 2
     * @returns                 [[], []]
     */
    splitToChunks(array, parts) {
        let result = [];
        const copyArray = [...array];
        for (let i = parts; i > 0; i--) {
            result.push(copyArray.splice(0, Math.ceil(copyArray.length / i)));
        }
        return result;
    }

    /**
     * Function to find the window size
     */
    intervalId = null;

    checkWindowSize = () => {
        this.intervalId = setInterval(() => {
            if (window.innerWidth !== this.state.windowSize) {
                this.setState({
                    windowSize: window.innerWidth,
                });
            }
        }, 100);
    };

    favoriteHandler = (event, url) => {
        event.preventDefault();
        const photoObj = {
            url: url,
            category: "sunrise", // Change to dynamic
        };
        axios
            .post(`${API_URL}/photos`, photoObj)
            .then((_response) => console.log("Saved to favorites"))
            .catch((_err) => console.log("Not saved"));
    };

    photoGrid(photoArrList) {
        return (
            <div className="photo-gallery">
                {photoArrList.map((photoArr, index) => {
                    return (
                        <div
                            className="photo-gallery__column"
                            key={`photo array ${index + 1}`}
                        >
                            {photoArr.map((photo) => {
                                return (
                                    <Link
                                        to={{
                                            pathname: `/inspire/${photo.id}/colors`,
                                            state: { url: photo.urls.regular },
                                        }}
                                        key={photo.id}
                                        className="photo-gallery__image-link"
                                    >
                                        <div className="photo-gallery__image-container">
                                            <img
                                                src={photo.urls.regular}
                                                alt={
                                                    photo.description
                                                        ? photo.description
                                                        : photo.alt_description
                                                }
                                                className="photo-gallery__image"
                                            />
                                            <div className="photo-gallery__image-overlay">
                                                <img
                                                    src={heartIcon}
                                                    alt="Heart Icon"
                                                    className="photo-gallery__icon"
                                                    onClick={(event) =>
                                                        this.favoriteHandler(
                                                            event,
                                                            photo.urls.regular
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    componentDidMount() {
        axios
            .get(
                `${UNSPLASH_API_URL}/search/photos/?query=sunrise&client_id=${UNSPLASH_API_KEY}&per_page=12`
            )
            .then((response) => {
                this.setState({ photos: response.data.results });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: true });
            });
        this.checkWindowSize();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        if (this.state.photos.length === 0) {
            return <div>Finding photos...</div>;
        }
        let modifiedPhotoArr = [];
        if (this.state.windowSize < 1280) {
            modifiedPhotoArr = this.splitToChunks(this.state.photos, 2);
        } else {
            modifiedPhotoArr = this.splitToChunks(this.state.photos, 3);
        }
        return (
            <>
                <Search placeholderText="What do you feel like painting?" />
                {this.photoGrid(modifiedPhotoArr)}
            </>
        );
    }
}

export default InspirePage;
