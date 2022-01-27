import "./ColorsPage.scss";

import { Component } from "react";
import { Link } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";

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
                <ColorExtractor getColors={this.getColors}>
                    <img src={URL} className="color__image" />
                </ColorExtractor>
                <div className="color__palette-container">
                    {this.renderSwatches()}
                </div>
                <div>
                    Checkout these{" "}
                    <Link
                        to={{
                            pathname: `/tutorials/${category}`,
                            state: { keywords: keywords },
                        }}
                    >
                        tutorials
                    </Link>{" "}
                    to learn some techniques.
                </div>
            </div>
        );
    }
}
export default ColorsPage;
