import "./PhotoFrame.scss";

import heartIcon from "../../assets/icons/heart-solid.svg";

function PhotoFrame({ url, description, category, favoriteHandler }) {
    return (
        <div className="photo__container">
            <img src={url} alt={description} className="photo__image" />
            <div className="photo-gallery__image-overlay">
                <img
                    src={heartIcon}
                    alt="Heart Icon"
                    className="photo__icon"
                    onClick={(event) => {
                        favoriteHandler(event, url, category);
                    }}
                />
            </div>
        </div>
    );
}

export default PhotoFrame;
