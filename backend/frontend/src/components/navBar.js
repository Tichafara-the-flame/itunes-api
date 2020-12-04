import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
  return (
    <header className="App-header">
      <Navbar>
        {/*---Logo icon image --- */}
        <Navbar.Brand href="/">
          <div>
         <h2> Home</h2>
          </div>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Navbar.Text className="nav-text">
            <Nav className="Design">
              <Link to="/music" className="link">
                Music
              </Link>
              <Link to="/videos" className="link">
                Videos
              </Link>
              <Link to="/movies" className="link">
                Movies
              </Link>
              <Link to="/audiobooks" className="link">
                Audio Books
              </Link>
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default NavBar;
