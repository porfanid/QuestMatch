import {Routes, Route, NavLink, Link, useNavigate} from "react-router-dom";
import Home from './Home/Home';
import About from "./About";
import About1 from "./About1";
import About2 from "./About2";
import Contribute from "./Contribute/contribute";
import Login from "./LogIn/LogIn";
import Profile from "./User/UserProfile";
import Signup from "./SignUp/SignUp";
import {useEffect, useState} from "react";
import { getAuth, signOut } from "firebase/auth";
import Character from "./CharacterSheet/Character";
import Spells from "./CharacterSheet/Spells";


function App() {
    const navigate = useNavigate();
    // State to store the selected class and race
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedRace, setSelectedRace] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const test = (isLoggedIn) => {
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
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, []);
  return (

      <>
          <header>
              <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                  <Link className="navbar-brand navbar-light" to="/">QuestMatch</Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <NavLink to="/" className="nav-link" end>Home</NavLink>
                          </li>
                          <li className="nav-item">
                              <NavLink exact to="/contribute" className="nav-link">Contribute</NavLink>
                          </li>
                      </ul>
                  </div>
                  {
                        test(isLoggedIn)
                  }

              </nav>
          </header>


      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="contribute" element={<Contribute/>} />
          <Route exact path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="signup" element={<Signup/>} />
          <Route exact path="profile/" element={<Profile/>}/>
          <Route exact path="character" element={<Character selectClass={setSelectedClass} selectRace={setSelectedRace} setSelectedLevel={setSelectedLevel}/>}/>
          <Route exact path="character/spells" element={<Spells selectedClass={selectedClass} selectedRace={selectedRace} selectedLevel={selectedLevel}/>}/>
          <Route path="about" element={<About/>} >
              <Route path="" element={<About1/>} />
              <Route path="about" element={<About2/>} />
              <Route path="contact" element={<About2/>} />
          </Route>
          <Route path="contact" element={<Home/>} >
          </Route>
          {/* Add more routes as needed */}
      </Routes>


      </>
  );
}


export default App;
