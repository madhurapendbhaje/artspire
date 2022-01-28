import "./Button.scss";

function Button({ clickHandler, buttonText }) {
    return (
        <button className="button" onClick={clickHandler}>
            {buttonText}
        </button>
    );
}

export default Button;
