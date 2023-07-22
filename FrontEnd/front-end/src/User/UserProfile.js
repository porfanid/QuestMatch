import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, storage} from '../firebase/firebase'; // Import firestore
import {
    ref,
    uploadBytesResumable
} from "firebase/storage";

const Profile = () => {
    const { userId } = useParams();
    const currentUser = auth.currentUser;

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (currentUser && currentUser.uid === userId) {
            setUsername(currentUser.displayName || '');
            setFullname(currentUser.metadata.fullname || '');
            setProfilePic(currentUser.photoURL || null);
        }
    }, [currentUser, userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const saveChanges = async () => {
        try {
            if (currentUser) {
                // Save profile picture to Firestore
                console.log(currentUser.email)
                if (selectedFile) {
                    const re = /(?:\.([^.]+))?$/;
                    const ext = re.exec(selectedFile.name)[0];
                    const storageRef = ref(storage, `/profile/${currentUser.email}/profile.${ext}`);
                    //const uploadTask =
                    uploadBytesResumable(storageRef, selectedFile);
                }else{
                    setUploadError("No file was selected");
                    alert('No file was selected');
                }

                setUploadError(null);
                alert('Changes saved successfully!');
            }else{
                setUploadError("No user was found");
                alert('No user was found');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setUploadError('Failed to save changes. Please try again later.');
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
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullname">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="profile-pic">Profile Picture</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="text-center">
                                <button type="button" className="btn btn-primary" onClick={saveChanges}>
                                    Save Changes
                                </button>
                            </div>
                        </form>

                        {uploadError && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {uploadError}
                            </div>
                        )}

                        {profilePic && (
                            <div className="text-center mt-4">
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
