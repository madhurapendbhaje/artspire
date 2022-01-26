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
                    <NavLink to="/inspire" className="header__navigation-link">
                        Inspire Me
                    </NavLink>
                </nav>
            </header>
        </>
    );
}

export default Header;
