import "./Tutorials.scss";

import { Component } from "react";
import axios from "axios";

import heartIcon from "../../assets/icons/heart-solid.svg";
import backIcon from "../../assets/icons/angle-left-solid.svg";

const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

class Tutorials extends Component {
    state = {
        tutorials: [],
    };
    componentDidMount() {
        const keywords = this.props.location.state.keywords;
        axios
            .get(
                `${YOUTUBE_API_URL}/?part=snippet&q=watercolor,${keywords.join()}&max_results=6&key=${YOUTUBE_API_KEY}`
            )
            .then((response) => {
                this.setState({ tutorials: response.data.items });
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div className="video-grid">
                <div className="video-grid__save">
                    <img
                        src={backIcon}
                        alt="back icon"
                        className="color__icon"
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    />
                </div>

                <div className="video-grid__container">
                    {this.state.tutorials.map((video) => {
                        const { id, snippet } = video;
                        return (
                            <div
                                key={id.videoId}
                                className="video-grid__video-frame"
                            >
                                <iframe
                                    src={`https://www.youtube.com/embed/${id.videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="video-grid__video"
                                />
                                <div className="video-grid__caption-container">
                                    <h4 className="video-grid__caption">
                                        {snippet.title}
                                    </h4>
                                    <img
                                        src={heartIcon}
                                        alt="heart icon"
                                        className="video-grid__icon"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Tutorials;
