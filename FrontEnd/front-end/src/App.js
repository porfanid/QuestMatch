import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import About from "./About";
function App() {
  return (
      <Router>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Home/>} />
          {/* Add more routes as needed */}
      </Routes>
      </Router>
  );
}


export default App;
