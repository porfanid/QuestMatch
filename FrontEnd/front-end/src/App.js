import {Routes, Route, NavLink, Link, useNavigate} from "react-router-dom";
import Home from './Home/Home';
import Contribute from "./Contribute/contribute";
import Login from "./Authentication/LogIn/LogIn";
import Profile from "./User/UserProfile";
import Signup from "./Authentication/SignUp/SignUp";
import {useEffect, useState} from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Character from "./CharacterSheet/ClassRace";
import Spells from "./CharacterSheet/Spells";
import { auth } from './firebase/firebase';
import Equipment from "./CharacterSheet/Equipment";


function App() {
    const navigate = useNavigate();
    // State to store the selected class and race
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedRace, setSelectedRace] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [ setSelectedSpells] = useState(null);

    const test = () => {
        if (isLoggedIn) {
            return (
                <button onClick={logOut} className="btn btn-primary ml-auto">
                    Logout
                </button>
            );
        } else {
            return (
                <Link to="/login" className="btn btn-primary ml-auto">
                    Login
                </Link>
            );
        }
    };

    const logOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                alert('Success');
                setIsLoggedIn(false);
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                navigate('/'); // Redirect to the root path ("/") after successful logout
            })
            .catch((error) => {
                alert('Something went wrong while signing you out: ' + error);
            });
    };

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                //const discordUsername = user.customClaims.discordUsername;
                //console.log(`GitHub username: ${discordUsername}`);
                setIsLoggedIn(true);
            } else {
                console.log('No user signed in');
                setIsLoggedIn(false);
            }
        });

        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, [navigate]);


    return (

        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-light" to="/">QuestMatch</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink exact to="/" className="nav-link text-light"
                                             activeClassName="active">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/contribute" className="nav-link text-light"
                                             activeClassName="active">Contribute</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/character" className="nav-link text-light"
                                             activeClassName="active">Create Character</NavLink>
                                </li>
                            </ul>
                        </div>
                        {test()}
                    </div>
                </nav>
            </header>


            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="contribute" element={<Contribute/>}/>
                <Route exact path="login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route exact path="signup" element={<Signup/>}/>
                <Route exact path="profile/" element={<Profile/>}/>
                <Route exact path="character"
                       element={<Character selectClass={setSelectedClass} selectRace={setSelectedRace}
                                           selectLevel={setSelectedLevel}/>}/>
                <Route exact path="character/spells"
                       element={<Spells setSelectedSpells={setSelectedSpells} selectedClass={selectedClass}
                                        selectedRace={selectedRace} selectedLevel={selectedLevel}/>}/>
                <Route exact path="character/equipment" element={<Equipment/>}/>
                <Route path="contact" element={<Home/>}/>
                {/* Add more routes as needed */}
            </Routes>


        </>
    );
}


export default App;
