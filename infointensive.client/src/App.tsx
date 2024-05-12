import { Link, Outlet } from 'react-router-dom';

import './App.tsx.css';
import { useState } from 'react';
import ButtonLink from './components/ButtonLink';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav>
                <Link to="/" className="title">
                    InfoIntensive
                </Link>
                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <ButtonLink to="/about" variant="outline-light">About</ButtonLink>
                    </li>
                    <li>
                        <ButtonLink to="/services" variant="outline-light">Services</ButtonLink>
                    </li>
                    <li>
                        <ButtonLink to="/contact" variant="outline-light">Contact</ButtonLink>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    );
}

export default App;