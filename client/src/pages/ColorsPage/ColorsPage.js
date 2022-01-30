import "./ColorsPage.scss";

import { Component } from "react";
import { Link } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import axios from "axios";

import heartIcon from "../../assets/icons/heart-solid.svg";
import backIcon from "../../assets/icons/angle-left-solid.svg";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class ColorsPage extends Component {
    state = {
        colors: [],
        windowSize: null,
    };

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

    renderSwatches = () => {
        const { colors } = this.state;

        const mobileStyleObject = {
            width: 100 + "%",
            height: 2 + "rem",
        };

        const tabletStyleObject = {
            width: 100 + "%",
            height: 6.25 + "rem",
        };
        const styleObject =
            this.state.windowSize >= 768
                ? tabletStyleObject
                : mobileStyleObject;

        return colors.map((color, id) => {
            return (
                <div
                    key={id}
                    style={{
                        backgroundColor: color,
                        ...styleObject,
                    }}
                    className="color__palette"
                />
            );
        });
    };

    getColors = (colors) => {
        this.setState((state) => ({ colors: [...state.colors, ...colors] }));
    };

    favoriteHandler = (event, url, category) => {
        event.preventDefault();
        console.log(this.props);
        const photoObj = {
            user_id: this.props.user.id,
            url: url,
            category: category,
        };
        axios
            .post(`${API_URL}/photos`, photoObj)
            .then((_response) => console.log("Saved to favorites"))
            .catch((_err) => console.log("Not saved"));
    };

    componentDidMount() {
        this.checkWindowSize();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const URL = this.props.location.state?.url;
        const category = this.props.location.state.category;
        const keywords = this.props.location.state.keywords;

        return (
            <div className="color">
                <img
                    src={backIcon}
                    alt="back icon"
                    className="color__icon"
                    onClick={() => {
                        this.props.history.goBack();
                    }}
                />
                <div className="color__image-container">
                    <ColorExtractor getColors={this.getColors}>
                        <img src={URL} className="color__image" />
                    </ColorExtractor>
                </div>
                <div className="color__palette-container">
                    {this.renderSwatches()}
                </div>
                <div className="color__cta">
                    <img
                        src={heartIcon}
                        slt="Heart icon"
                        className="color__icon"
                        onClick={(event) => {
                            this.favoriteHandler(event, URL, category);
                        }}
                    />
                    <Link
                        to={{
                            pathname: `/tutorials/${category}`,
                            state: { keywords: keywords },
                        }}
                        className="color__button"
                    >
                        Tutorials
                    </Link>
                </div>
            </div>
        );
    }
}
export default ColorsPage;
