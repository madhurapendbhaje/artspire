import "./Error.scss";

import notFoundImg from "../../assets/images/404.svg";

function Error() {
    return (
        <div className="error">
            <img src={notFoundImg} alt="Not found" className="error__image" />
        </div>
    );
}

export default Error;
