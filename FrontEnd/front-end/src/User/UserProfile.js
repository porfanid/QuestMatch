import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';

const Profile = () => {
    const auth = getAuth();
    const currentUser = JSON.parse(localStorage.getItem("user"));


    const [username, setUsername] = useState(currentUser.email || '');
    const [fullname, setFullname] = useState(currentUser.displayName || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePic, setProfilePic] = useState(currentUser.photoURL || null);
    const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
    const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        setUsername(currentUser.email || '');
    }, [currentUser]);




    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const toggleEditDisplayName = () => {
        setIsEditingDisplayName((prevState) => !prevState);
    };

    const toggleEditProfilePicture = () => {
        setIsEditingProfilePicture((prevState) => !prevState);
    };

    const saveDisplayName = async () => {
        try {
            if (currentUser) {
                const displayName = fullname;
                await updateProfile(auth.currentUser, { displayName });
                toggleEditDisplayName();
                localStorage.setItem("user", JSON.stringify(auth.currentUser));
                alert('Display name updated successfully!');
            } else {
                alert('No user was found');
            }
        } catch (error) {
            console.error('Error updating display name:', error);
            setUploadError('Failed to update display name. Please try again later.');
        }
    };

    const saveProfilePicture = async () => {
        try {
            if (currentUser) {
                if (selectedFile) {
                    const re = /(?:\.([^.]+))?$/;
                    const ext = re.exec(selectedFile.name)[0];
                    const storageRef = ref(
                        storage,
                        `/profile/${currentUser.email}/profile.${ext}`
                    );


                    try {
                        await uploadBytesResumable(storageRef, selectedFile);
                    }catch{
                        setUploadError("Failed to upload file");
                        return;
                    }
                    let downLoadLink;
                    try {
                        downLoadLink = await getDownloadURL(storageRef);
                        setProfilePic(downLoadLink);
                    }catch (e) {
                        setUploadError("Failed to get Dowload Link"+ e);
                        return;
                    }
                    try {
                        await updateProfile(auth.currentUser, { photoURL: downLoadLink });
                        localStorage.setItem("user", JSON.stringify(auth.currentUser));

                    }catch(e){
                        setUploadError("Failed to update the profile picture: "+e);
                        return;
                    }
                    toggleEditProfilePicture();
                    alert('Profile picture updated successfully!');
                } else {
                    setUploadError('No file was selected');
                    alert('No file was selected');
                }
            } else {
                setUploadError('No user was found');
                alert('No user was found');
            }
        } catch (error) {
            console.error('Error updating profile picture:', error);
            setUploadError('Failed to update profile picture. Please try again later.');
        }
    };

    return (
        <main className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">Edit Profile</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="profile-pic">Profile Picture</label>
                                <div className="input-group">
                                    {profilePic && (
                                        <img
                                            src={profilePic}
                                            alt="Profile"
                                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                        />
                                    )}
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={!isEditingProfilePicture}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className={`btn ${isEditingProfilePicture ? 'btn-secondary' : 'btn-primary'}`}
                                            onClick={toggleEditProfilePicture}
                                        >
                                            {isEditingProfilePicture ? 'Cancel' : 'Edit'}
                                        </button>
                                        {isEditingProfilePicture && (
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={saveProfilePicture}
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    readOnly
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullname">Full Name</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        readOnly={!isEditingDisplayName}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className={`btn ${isEditingDisplayName ? 'btn-secondary' : 'btn-primary'}`}
                                            onClick={toggleEditDisplayName}
                                        >
                                            {isEditingDisplayName ? 'Cancel' : 'Edit'}
                                        </button>
                                        {isEditingDisplayName && (
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={saveDisplayName}
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>

                        {uploadError && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {uploadError}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
