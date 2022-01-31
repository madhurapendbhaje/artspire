import "./ProfilePage.scss";

import { Component } from "react";
import axios from "axios";

import profileImg from "../../assets/images/preferences.svg";
import UserHome from "../../components/UserHome";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class ProfilePage extends Component {
    state = {
        level: "beginner",
        medium: [],
        isProfileUpdated: false,
        user: null,
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

        const userId = this.props.user.id;
        const userPref = {
            level: this.state.level,
            medium: this.state.medium,
        };
        axios
            .put(`${API_URL}/users/${userId}`, userPref)
            .then((_response) => {
                this.setState({ isProfileUpdated: true });
            })
            .catch((err) => {
                console.log(err);
            });
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

    componentDidMount() {
        axios
            .get(`${API_URL}/users/${this.props.user.id}`)
            .then((res) => {
                console.log(res.data);
                this.setState({ user: res.data });
            })
            .catch((err) => console.log(err));
    }

    render() {
        console.log(this.props.user);
        const { first_name, last_name } = this.props.user;
        if (this.state.user?.is_profile_complete === 1) {
            return <UserHome userId={this.props.user.id} />;
        }
        return (
            <div className="profile-page">
                <div className="profile-page__container">
                    <h1 className="profile-page__title">
                        Welcome{" "}
                        <span className="profile-page__name">
                            {first_name + " " + last_name}
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
