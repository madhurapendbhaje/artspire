import "./ColorsPage.scss";

import { Component } from "react";
import { Link } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import axios from "axios";

import backIcon from "../../assets/icons/angle-left-solid.svg";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class ColorsPage extends Component {
    state = {
        colors: [],
        windowSize: null,
        active: false,
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

    changeColor() {
        {
            this.setState({ active: !this.state.active });
        }
    }

    renderSwatches = () => {
        const { colors } = this.state;

        const mobileStyleObject = {
            width: 100 + "%",
            height: 4 + "rem",
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
        const photoObj = {
            user_id: this.props.user.id,
            url: url,
            category: category,
        };
        axios
            .post(`${API_URL}/photos`, photoObj)
            .then((_response) => {})
            .catch((_err) => {});
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
        const page = this.props.location.state.page;

        return (
            <div className="color">
                <div className="color__cta">
                    <Link
                        to={{
                            pathname: "/inspire",
                            state: {
                                category: category,
                                page: page,
                            },
                        }}
                    >
                        <img
                            src={backIcon}
                            alt="back icon"
                            className="color__icon"
                        />
                    </Link>
                    <div className="color__cta-container">
                        <div
                            className={
                                this.state.active
                                    ? "color__heart-icon color__heart-icon--highlight"
                                    : "color__heart-icon"
                            }
                            onClick={(event) => {
                                this.favoriteHandler(event, URL, category);
                                this.changeColor();
                            }}
                        ></div>
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

                <div className="color__image-container">
                    <ColorExtractor getColors={this.getColors}>
                        <img src={URL} className="color__image" />
                    </ColorExtractor>
                </div>
                <div className="color__palette-container">
                    {this.renderSwatches()}
                </div>
            </div>
        );
    }
}
export default ColorsPage;
