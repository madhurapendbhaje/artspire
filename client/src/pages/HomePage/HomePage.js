import "./HomePage.scss";

import homePageImage from "../../assets/images/home-page.svg";

function HomePage() {
    return (
        <div className="home-page">
            <img
                src={homePageImage}
                alt="home page"
                className="home-page__image"
            />
        </div>
    );
}

export default HomePage;
