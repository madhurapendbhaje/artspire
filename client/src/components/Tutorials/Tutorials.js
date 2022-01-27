import "./Tutorials.scss";

import { Component } from "react";
import axios from "axios";

const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

class Tutorials extends Component {
    state = {
        tutorials: [],
    };
    componentDidMount() {
        const keywords = this.props.location.state.keywords;
        console.log(keywords.join());
        axios
            .get(
                `${YOUTUBE_API_URL}/?part=snippet&q=watercolor,${keywords.join()}&key=${YOUTUBE_API_KEY}`
            )
            .then((response) => {
                this.setState({ tutorials: response.data.items });
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div>
                {this.state.tutorials.map((video) => {
                    const { id, snippet } = video;
                    return (
                        <div key={id.videoId}>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${id.videoId}`}
                                title={snippet.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Tutorials;
