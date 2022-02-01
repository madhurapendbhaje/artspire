import "./InspirePage.scss";

import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import brushIcon from "../../assets/icons/paint-brush-solid.svg";
import Search from "../../components/Search";
import PhotoFrame from "../../components/PhotoFrame";

const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class InspirePage extends Component {
    state = {
        photos: [],
        error: false,
        windowSize: null,
        validationError: false,
        category: null,
        page: 1,
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

    getPhotos = (category) => {
        axios
            .get(
                `${UNSPLASH_API_URL}/search/photos/?query=${category}&client_id=${UNSPLASH_API_KEY}&per_page=6&page=${this.state.page}`
            )
            .then((response) => {
                this.setState({ photos: response.data.results });
            })
            .catch((_err) => {
                this.setState({ error: true });
            });
    };

    favoriteHandler = (event, url) => {
        event.preventDefault();
        const photoObj = {
            user_id: this.props.user.id,
            url: url,
            category: this.state.category,
        };
        axios
            .post(`${API_URL}/photos`, photoObj)
            .then((_response) => {})
            .catch((_err) => {
                this.setState({ error: true });
            });
    };

    submitHandler = (event) => {
        event.preventDefault();
        const input = event.target.search.value;
        if (!input) {
            this.setState({ validationError: true });
            return;
        }
        this.setState({ category: input });
        this.getPhotos(input);
    };

    moreHandler = (event) => {
        event.preventDefault();
        // Increment the page count to search new photos
        // this.setState({ page: this.state.page + 1 });
        // console.log(this.state.page);
        console.log(this.state);
        this.setState({ page: this.state.page + 1 });
        this.getPhotos(this.state.category);
    };

    photoGrid(photoArrList) {
        return (
            <>
                <div className="photo-gallery">
                    {photoArrList.map((photoArr, index) => {
                        return (
                            <div
                                className="photo-gallery__column"
                                key={`photo array ${index + 1}`}
                            >
                                {photoArr.map((photo) => {
                                    let tags = [];
                                    photo.tags.forEach((tag) => {
                                        if (tag.title !== "background") {
                                            tags.push(tag.title);
                                        }
                                    });
                                    return (
                                        <Link
                                            to={{
                                                pathname: `/inspire/${photo.id}/colors`,
                                                state: {
                                                    url: photo.urls.regular,
                                                    category:
                                                        this.state.category,
                                                    keywords: tags,
                                                },
                                            }}
                                            key={photo.id}
                                            className="photo-gallery__image-link"
                                        >
                                            <PhotoFrame
                                                url={photo.urls.regular}
                                                description={
                                                    photo.description
                                                        ? photo.description
                                                        : photo.alt_description
                                                }
                                                category={this.state.category}
                                                contentType="photo"
                                                favoriteHandler={
                                                    this.favoriteHandler
                                                }
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

    componentDidMount() {
        this.checkWindowSize();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        // if (this.state.photos.length === 0) {
        //     return <div>Finding photos...</div>;
        // }
        console.log("render");
        let modifiedPhotoArr = [];
        if (this.state.windowSize < 1280) {
            modifiedPhotoArr = this.splitToChunks(this.state?.photos, 2);
        } else {
            modifiedPhotoArr = this.splitToChunks(this.state?.photos, 3);
        }
        return (
            <div className="search-bar">
                <div className="search-bar__container">
                    {this.state.validationError ? (
                        <span className="search-bar__error-message">
                            This field is required
                        </span>
                    ) : null}
                    <form
                        className={
                            "search-bar__form-container" +
                            (this.state.validationError
                                ? " search-bar__form-container--error"
                                : "")
                        }
                        onSubmit={this.submitHandler}
                    >
                        <Search placeholderText="What do you feel like painting?" />
                        <button type="submit" className="search-bar__button">
                            <img
                                src={brushIcon}
                                alt="Paint brush icon"
                                className="search-bar__icon"
                            />
                        </button>
                    </form>
                </div>
                {this.photoGrid(modifiedPhotoArr)}
                {this.state.photos.length ? (
                    <span className="search-bar__show-more-container">
                        {" "}
                        Not inspired yet?
                        <button
                            className="search-bar__show-more"
                            onClick={this.moreHandler}
                        >
                            Show more
                        </button>
                    </span>
                ) : (
                    <></>
                )}
            </div>
        );
    }
}

export default InspirePage;
