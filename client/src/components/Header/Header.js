import "./Header.scss";

import logo from "../../assets/logo/artspire.svg";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <header className="header">
                <NavLink to="/" className="header__logo-link">
                    <img src={logo} alt="Logo" className="header__logo" />
                </NavLink>
                <nav className="header__navigation">
                    <NavLink
                        to="/inspire"
                        className="header__navigation-link"
                        activeClassName="header__navigation-link--active"
                    >
                        Inspire Me
                    </NavLink>
                    <NavLink
                        to="/tutorials"
                        className="header__navigation-link"
                        activeClassName="header__navigation-link--active"
                    >
                        Tutorials
                    </NavLink>
                </nav>
            </header>
        </>
    );
}

export default Header;
