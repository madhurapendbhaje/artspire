import "./VideoFrame.scss";

import heartIcon from "../../assets/icons/heart-solid.svg";

function VideoFrame({ videoId, url, title, favoriteHandler }) {
    return (
        <div className="video__container" key={videoId}>
            <div className="video__frame">
                <iframe
                    src={url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video__play"
                />
            </div>
            <div className="video__caption-container">
                <h4 className="video__caption">{title}</h4>
                <img
                    src={heartIcon}
                    alt="heart icon"
                    className="video__caption-icon"
                    onClick={(event) => {
                        favoriteHandler(event, url);
                    }}
                />
            </div>
        </div>
    );
}

export default VideoFrame;
