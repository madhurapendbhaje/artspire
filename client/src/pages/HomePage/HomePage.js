import "./HomePage.scss";

import homePageImage from "../../assets/images/artists-abstract.jpg";

function HomePage() {
    return (
        <div className="home-page">
            <img
                src={homePageImage}
                alt="home page"
                className="home-page__image"
            />
            <a
                href="https://www.freepik.com/vectors/school"
                className="home-page__attr"
            >
                School vector created by pch.vector - www.freepik.com
            </a>
        </div>
    );
}

export default HomePage;
