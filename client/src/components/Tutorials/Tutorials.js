import "./Tutorials.scss";

import { Component } from "react";
import axios from "axios";

import heartIcon from "../../assets/icons/heart-solid.svg";
import backIcon from "../../assets/icons/angle-left-solid.svg";
import VideoFrame from "../VideoFrame/VideoFrame";

const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const API_URL = process.env.REACT_APP_BACKEND_API_URL;

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
            .catch((err) => {});
    }

    favoriteHandler = (event, url, title, contentType, category) => {
        event.preventDefault();
        const tutorialObj = {
            user_id: this.props.user.id,
            url: url,
            title: title,
            category: category,
        };
        axios
            .post(`${API_URL}/tutorials`, tutorialObj)
            .then((_response) => {})
            .catch((_err) => {});
    };

    render() {
        return (
            <div className="tutorials-grid">
                <div className="tutorials-grid__save">
                    <img
                        src={backIcon}
                        alt="back icon"
                        className="color__icon"
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    />
                </div>

                <div className="tutorials-grid__container">
                    {this.state.tutorials.map((video) => {
                        const { id, snippet } = video;
                        const videoURL = `https://www.youtube.com/embed/${id.videoId}`;
                        return (
                            <VideoFrame
                                userId={this.props.user.id}
                                url={videoURL}
                                videoId={id}
                                title={snippet.title}
                                contentType={"tutorials"}
                                category={this.props.match.params.category}
                                favoriteHandler={this.favoriteHandler}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Tutorials;
