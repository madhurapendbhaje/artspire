import "./InspirePage.scss";

import { Component } from "react";
import axios from "axios";

import heartIcon from "../../assets/icons/heart.svg";

const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

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

    componentDidMount() {
        axios
            .get(
                `${UNSPLASH_API_URL}/search/photos/?query=sunset&client_id=${UNSPLASH_API_KEY}&per_page=12`
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
        if (this.state.error) {
            return <div>Finding photos...</div>;
        }
        // For tablet window size, photo gallery will consist of two columns
        if (this.state.windowSize >= 768 && this.state.windowSize < 1280) {
            const modifiedPhotoArr = this.splitToChunks(this.state.photos, 2);
            return (
                <div className="photo-gallery">
                    {modifiedPhotoArr.map((photoArr) => {
                        return (
                            <div className="photo-gallery__column">
                                {photoArr.map((photo) => {
                                    return (
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
                                            <div className="photo-gallery__image-overlay-container">
                                                <div className="photo-gallery__image-overlay">
                                                    <img
                                                        src={heartIcon}
                                                        alt="Heart Icon"
                                                        className="photo-gallery__icon"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            // For desktop window size, photo gallery will consist of three columns
            const modifiedPhotoArr = this.splitToChunks(this.state.photos, 3);
            return (
                <div className="photo-gallery">
                    {modifiedPhotoArr.map((photoArr) => {
                        return (
                            <div className="photo-gallery__column">
                                {photoArr.map((photo) => {
                                    return (
                                        <img
                                            src={photo.urls.regular}
                                            alt={
                                                photo.description
                                                    ? photo.description
                                                    : photo.alt_description
                                            }
                                            className="photo-gallery__image"
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }
}

export default InspirePage;
