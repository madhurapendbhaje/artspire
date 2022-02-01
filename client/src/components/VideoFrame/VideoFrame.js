import "./VideoFrame.scss";

import { Component } from "react";

class VideoFrame extends Component {
    state = {
        active: false,
    };

    changeColor() {
        {
            this.setState({ active: !this.state.active });
        }
    }

    render() {
        return (
            <div className="video__container" key={this.props.videoId}>
                <div className="video__frame">
                    <iframe
                        src={this.props.url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="video__play"
                    />
                </div>
                <div className="video__caption-container">
                    <h4 className="video__caption">{this.props.title}</h4>
                    <div
                        className={
                            this.state.active
                                ? "video__caption-icon video__caption-icon--highlight"
                                : "video__caption-icon"
                        }
                        onClick={(event) => {
                            this.props.favoriteHandler(
                                event,
                                this.props.url,
                                this.props.title,
                                this.props.contentType,
                                this.props.category
                            );
                            this.changeColor();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default VideoFrame;
