import "./HomePage.scss";

import { Link } from "react-router-dom";

import homePageImage from "../../assets/images/home-page.svg";

function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page__hero">
                <div>
                    <h1>Artspire</h1>
                    <Link to="/users/login" className="home-page__link">
                        Get Started
                    </Link>
                </div>

                <img
                    src={homePageImage}
                    alt="home page"
                    className="home-page__image"
                />
            </div>
        </div>
    );
}

export default HomePage;
