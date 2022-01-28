import "./ProfilePage.scss";

import { Component } from "react";

import profileImg from "../../assets/images/preferences.svg";

class ProfilePage extends Component {
    state = {
        level: "beginner",
        medium: [],
    };

    /**
     * Handler to record level selection by user
     * @param {object} event
     */
    onChangeSelect = (event) => {
        this.setState({ level: event.target.value });
    };

    /**
     * Handler to record medium selections by user
     * @param {object} event
     */
    onChangeMedium = (event) => {
        const selectedMedium = event.target.value;
        let currentMedium = this.state.medium;

        // If the selected medium exists, remove it (user selecting/un-selecting)
        if (currentMedium.includes(selectedMedium)) {
            let index = currentMedium.indexOf(selectedMedium);
            currentMedium.splice(index, 1);
        } else {
            currentMedium.push(selectedMedium);
        }
        this.setState({ medium: currentMedium });
    };

    /**
     * Handler to update user profile in backend upon form submission
     * @param {object} event
     */
    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.level);
        console.log(this.state.medium);
    };

    /**
     *
     * @returns HTML element for radio selection
     */
    radioSelect = () => {
        return (
            <div className="select">
                <p className="select__title">
                    {" "}
                    What's your proficiency level with painting?{" "}
                </p>
                <label className="select__label">
                    Paint? Brushes? Canvas?
                    <input
                        type="radio"
                        id="level"
                        name="level"
                        value="beginner"
                        defaultChecked="checked"
                        className="select__option"
                        onChange={this.onChangeSelect}
                    />
                    <span className="select__checkmark"></span>
                </label>
                <label className="select__label">
                    I know my way around a canvas
                    <input
                        type="radio"
                        id="level"
                        name="level"
                        value="intermediate"
                        className="select__option"
                        onChange={this.onChangeSelect}
                    />
                    <span className="select__checkmark"></span>
                </label>
                <label className="select__label">
                    I'm a pro
                    <input
                        type="radio"
                        id="level"
                        name="level"
                        value="advanced"
                        className="select__option"
                        onChange={this.onChangeSelect}
                    />
                    <span className="select__checkmark"></span>
                </label>
            </div>
        );
    };

    /**
     *
     * @returns HTML element for checkbox selection
     */
    boxSelect = () => {
        return (
            <div className="check__container">
                <p className="check__title">
                    {" "}
                    Which painting medium do you prefer?{" "}
                </p>
                <label className="check__label">
                    Watercolor
                    <input
                        className="check__option"
                        type="checkbox"
                        value="watercolor"
                        onChange={this.onChangeMedium}
                    />
                    <span className="check__checkmark-box"></span>
                </label>
                <label className="check__label">
                    Acrylic
                    <input
                        className="check__option"
                        type="checkbox"
                        value="acrylic"
                        onChange={this.onChangeMedium}
                    />
                    <span className="check__checkmark-box"></span>
                </label>
                <label className="check__label">
                    Oil
                    <input
                        className="check__option"
                        type="checkbox"
                        value="Oil"
                        onChange={this.onChangeMedium}
                    />
                    <span className="check__checkmark-box"></span>
                </label>
                <label className="check__label">
                    Gouache
                    <input
                        className="check__option"
                        type="checkbox"
                        value="Gouache"
                        onChange={this.onChangeMedium}
                    />
                    <span className="check__checkmark-box"></span>
                </label>
                <label className="check__label">
                    Digital
                    <input
                        className="check__option"
                        type="checkbox"
                        value="digital"
                        onChange={this.onChangeMedium}
                    />
                    <span className="check__checkmark-box"></span>
                </label>
            </div>
        );
    };

    render() {
        return (
            <div className="profile-page">
                <div className="profile-page__container">
                    <h1 className="profile-page__title">
                        Welcome{" "}
                        <span className="profile-page__name">
                            {this.props.user.displayName}
                        </span>{" "}
                        !
                    </h1>
                    <form
                        className="profile-page__form"
                        onSubmit={this.submitHandler}
                    >
                        <h3 className="profile-page__form-title">
                            Let's complete your profile:
                        </h3>
                        {this.radioSelect()}
                        {this.boxSelect()}
                        <button className="profile-page__form-button">
                            Save
                        </button>
                    </form>
                </div>
                <div className="profile-page__artwork-container">
                    <img
                        src={profileImg}
                        alt="Profile artwork"
                        className="profile-page__artwork"
                    />
                </div>
            </div>
        );
    }
}

export default ProfilePage;
