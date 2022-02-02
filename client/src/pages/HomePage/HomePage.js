import "./HomePage.scss";

import { Component } from "react";
import { Link } from "react-router-dom";

import homePageImage from "../../assets/images/home-page.svg";
import inspireImage from "../../assets/images/inspire.svg";
import tutorialImage from "../../assets/images/tutorial.svg";

const data = [
    {
        author: "Bob Ross",
        saying: "I think each of us, sometime in our life, has wanted to paint a picture.",
    },
    {
        author: "Vincent Van Gogh",
        saying: "If you hear a voice within you say you cannot paint, then by all means paint and that voice will be silenced.",
    },
    {
        author: "Pablo Picasso",
        saying: "Painting is just another way of keeping a diary.",
    },
    {
        author: "Frida Kahlo",
        saying: "I don't paint dreams or nightmares, I paint my own reality.",
    },
    {
        author: "Bob Ross",
        saying: "All you need to paint is a few tools, a little instruction, and a vision in your mind.",
    },
    {
        author: "Edward Hopper",
        saying: "If you could say in words, there would be no reason to paint.",
    },
];

class HomePage extends Component {
    state = {
        dataIdx: 0,
    };
    componentDidMount() {
        this.timeout = setInterval(() => {
            let dataIdx = this.state.dataIdx;
            this.setState({ dataIdx: dataIdx + 1 });
        }, 5000);
    }

    componentDidUnmount() {
        clearInterval(this.timeout);
    }

    render() {
        let changingText = data[this.state.dataIdx % data.length];
        return (
            <div className="home-page">
                <div className="home-page__hero">
                    <div className="home-page__section">
                        <h1 className="home-page__section-title home-page__section-title--name">
                            Artspire
                        </h1>
                        <p className="home-page__section-left">
                            Giving you a start...
                        </p>
                        <p className="home-page__section-right">
                            ...in transforming your art
                        </p>
                        <Link
                            to="/users/login"
                            className="home-page__link home-page__link--button"
                        >
                            Get Started
                        </Link>
                    </div>
                    <img
                        src={homePageImage}
                        alt="home page"
                        className="home-page__image home-page__image--hero"
                    />
                </div>
                <div className="home-page__banner">
                    <h1 className="home-page__section-title ">
                        {`"${changingText.saying}"`}
                    </h1>
                    <p>{`-${changingText.author}`}</p>
                </div>
                <div className="home-page__inspire">
                    <div className="home-page__section">
                        <h1>Inspire Me</h1>
                        <p>
                            Find curated images on any theme as a source on
                            inspiration. Use the comprehensive gallery of images
                            to derive color palettes and start painting. You can
                            also save these images to your profile to come back
                            to them later.
                        </p>
                        <Link to="/inspire" className="home-page__link">
                            Start exploring
                        </Link>
                    </div>
                    <img
                        src={inspireImage}
                        alt="home page"
                        className="home-page__image home-page__image--inspire"
                    />
                </div>
                <div className="home-page__tutorial">
                    <div className="home-page__section">
                        <h1>Tutorials</h1>
                        <p>
                            Technique videos will provide you with basics and
                            helpful tips to assist you in your journey of
                            painting. Save these tutorials to your profile to
                            keep learning.
                        </p>
                        <Link to="/inspire" className="home-page__link">
                            Learn how
                        </Link>
                    </div>
                    <img
                        src={tutorialImage}
                        alt="home page"
                        className="home-page__image home-page__image--tutorial"
                    />
                </div>
            </div>
        );
    }
}

export default HomePage;
