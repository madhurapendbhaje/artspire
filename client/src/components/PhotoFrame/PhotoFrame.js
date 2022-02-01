import "./PhotoFrame.scss";

import { Component } from "react";

class PhotoFrame extends Component {
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
            <div className="photo__container">
                <img
                    src={this.props.url}
                    alt={this.props.description}
                    className="photo__image"
                />
                <div className="photo-gallery__image-overlay">
                    <div
                        className={
                            this.state.active
                                ? "photo__icon photo__icon--highlight"
                                : "photo__icon"
                        }
                        onClick={(event) => {
                            this.props.favoriteHandler(
                                event,
                                this.props.url,
                                "placeholder",
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

export default PhotoFrame;
