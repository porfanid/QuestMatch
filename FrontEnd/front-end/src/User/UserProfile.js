import User from "./UserData";
import {useParams} from "react-router-dom";

function UserProfile() {
    let { userid } = useParams();
    return (
        <>
            <div className="profile-header">
                <h2>{User[userid].name}</h2>
                <img src="profile-picture.jpg" alt="User Profile" width="150" height="150"/>
            </div>

            <div className="profile-details">

                {/* eslint-disable-next-line no-restricted-globals */}
                <p>Email: {User[userid].email}</p>
                <p>Bio: Lorem ipsum dolor sit amet...</p>
                <button className="btn btn-primary">Edit Profile</button>
            </div>

            <div className="character-section">

                <h3>My D&D Characters</h3>

            </div>

            <div className="campaigns-section">

                <h3>My Campaigns and Parties</h3>

            </div>

            <div className="social-section">

                <h3>Connect with Me</h3>

            </div>

            <div className="activity-feed">

                <h3>Recent Activity</h3>

            </div>

            <div className="privacy-settings">

                <h3>Privacy Settings</h3>

            </div>

            <div className="delete-account">

                <h3>Delete Account</h3>
                <button className="btn btn-danger">Delete Account</button>
            </div>
        </>
    );
}

export default UserProfile;