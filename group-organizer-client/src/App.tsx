import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from "./components/layout/custom-navbar";
import Home from './components/pages/home';
import Persons from './components/person/persons';
import About from './components/pages/about';
import Overview from './components/pages/overview';
import Groups from './components/group/groups';

function App() {
  return (
    <Router >
      <CustomNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/persons' element={<Persons />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/overview' element={<Overview />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;