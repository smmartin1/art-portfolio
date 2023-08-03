import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavbarView } from './navbar';
import { Welcome } from './welcome';
import { Traditional } from './traditional';
import { Digital } from './digital-art';
import { Photography } from './photography';
import { About } from './about';
import { Footer } from './footer';

//import { Container, Row, Col } from 'react-bootstrap';

import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <NavbarView />
            <Routes>
                <Route path="/" element={<Welcome />}/>
                <Route path="/traditional" element={<Traditional />}/>
                <Route path="/digital" element={<Digital />}/>
                <Route path="/photography" element={<Photography />}/>
                <Route path="/about" element={<About />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;