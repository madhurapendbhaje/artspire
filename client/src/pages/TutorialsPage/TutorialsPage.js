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

    componentDidMount() {
        axios
            .get(`${API_URL}/users/${this.props.user.id}/mediums`)
            .then((res) => {
                // this.setState({ mediums: response.data });
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
                <h2>Recommended for you</h2>
                {this.state.mediums.map((medium) => {
                    return (
                        <div
                            key={medium.medium_type}
                            className="tutorials__section"
                        >
                            <h3 className="tutorials__section-title">
                                {medium.medium_type}
                            </h3>
                            <div className="tutorials__medium-section">
                                {this.state[medium.medium_type]?.items.map(
                                    (video) => {
                                        return (
                                            <VideoFrame
                                                videoId={video.id.videoId}
                                                url={`https://www.youtube.com/embed/${video.id.videoId}`}
                                                title={video.snippet.title}
                                                favoriteHandler="test"
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
