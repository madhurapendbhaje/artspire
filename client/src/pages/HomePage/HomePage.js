import "./HomePage.scss";

import { Link } from "react-router-dom";

import homePageImage from "../../assets/images/home-page.svg";

function HomePage() {
    return (
        <div className="home-page">
            <img
                src={homePageImage}
                alt="home page"
                className="home-page__image"
            />
            <Link to="/users/login" className="home-page__link">
                Get Started
            </Link>
        </div>
    );
}

export default HomePage;
