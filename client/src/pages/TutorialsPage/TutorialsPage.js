import "./TutorialsPage.scss";

import { Component } from "react";
import axios from "axios";

import VideoFrame from "../../components/VideoFrame/VideoFrame";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;
const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

class TutorialsPage extends Component {
    state = {
        mediums: null,
        error: false,
    };

    favoriteHandler = (event, url, title, category) => {
        event.preventDefault();
        const tutorialObj = {
            user_id: this.props.user.id,
            url: url,
            title: title,
            category: category,
        };
        axios
            .post(`${API_URL}/tutorials`, tutorialObj)
            .then((response) => console.log(response))
            .catch((err) => {
                console.log("Not saved");
                console.log(err);
            });
    };

    componentDidMount() {
        axios
            .get(`${API_URL}/users/${this.props.user.id}/mediums`)
            .then((res) => {
                res.data.forEach((medium) => {
                    axios
                        .get(
                            `${YOUTUBE_API_URL}/?part=snippet&q=${medium.medium_type},technique,painting&max_results=6&key=${YOUTUBE_API_KEY}`
                        )
                        .then((response) => {
                            let mediumObj = {};
                            mediumObj[medium.medium_type] = response.data;
                            mediumObj.mediums = res.data;
                            this.setState(mediumObj);
                        })
                        .catch((_err) => {
                            this.setState({ error: true });
                        });
                });
            })
            .catch((_err) => {
                this.setState({ error: true });
            });
    }

    render() {
        if (!this.state.mediums) {
            return <div>Loading..</div>;
        }
        return (
            <div className="tutorials">
                <h1>Recommended for you</h1>
                {this.state.mediums.map((medium) => {
                    return (
                        <div
                            key={medium.medium_type}
                            className="tutorials__section"
                        >
                            <h2 className="tutorials__section-title">
                                {medium.medium_type}
                            </h2>
                            <div className="tutorials__medium-section">
                                {this.state[medium.medium_type]?.items.map(
                                    (video) => {
                                        return (
                                            <VideoFrame
                                                videoId={video.id.videoId}
                                                url={`https://www.youtube.com/embed/${video.id.videoId}`}
                                                title={video.snippet.title}
                                                favoriteHandler={(event) => {
                                                    this.favoriteHandler(
                                                        event,
                                                        `https://www.youtube.com/embed/${video.id.videoId}`,
                                                        video.snippet.title,
                                                        "techniques"
                                                    );
                                                }}
                                                key={video.id.videoId}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TutorialsPage;
