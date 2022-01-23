function UserProfile(props) {
    console.log(props);
    return <div>Welcome {props.user.displayName}</div>;
}

export default UserProfile;
