import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './input.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Schedule from './pages/Schedule';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />}/>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>

    </div>
  );
}

export default App;
