import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import About from "./About";
import About1 from "./About1";
import About2 from "./About2";
function App() {
  return (
      <Router>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="about" element={<About/>} >
              <Route path="" element={<About1/>} />
              <Route path="about" element={<About2/>} />
              <Route path="contact" element={<About2/>} />
          </Route>
          <Route path="contact" element={<Home/>} >
          </Route>
          {/* Add more routes as needed */}
      </Routes>
      </Router>
  );
}


export default App;
