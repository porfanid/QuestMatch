import "./App.css";
import logo from "./logo.svg";
import {Routes, Route, Outlet} from "react-router-dom";
import About1 from "./About1";
import About2 from "./About2";
function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                        <Outlet/>
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Home;