import "./InspirePage.scss";

import { Component } from "react";
import axios from "axios";

const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

class InspirePage extends Component {
    state = {
        photos: [],
        error: false,
    };
    componentDidMount() {
        axios
            .get(
                `${UNSPLASH_API_URL}/search/photos/?query=sunset&client_id=${UNSPLASH_API_KEY}`
            )
            .then((response) => {
                this.setState({ photos: response.data.results });
            })
            .catch((_err) => {
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <div className="photo-gallery">
                {this.state.photos.map((photo) => {
                    return (
                        <img
                            src={photo.urls.regular}
                            alt={
                                photo.description
                                    ? photo.description
                                    : photo.alt_description
                            }
                            className="photo-gallery__image"
                        />
                    );
                })}
            </div>
        );
    }
}

export default InspirePage;
