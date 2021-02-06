import React from "react";

// IMPORT COMPONENTS FROM REACT-BOOTSTRAP
import { Navbar, Nav} from "react-bootstrap";

function Header() {
    return (
        <Navbar variant="dark
        " expand="md" style={{ backgroundColor: "#2ab4e3" }}>
            <Navbar.Brand href="/">
                <h4>
                    <span role="img" aria-label="books">📚 </span>
                    Google Book Search
                </h4>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/search">Search for Books</Nav.Link>
                    <Navbar.Text> | </Navbar.Text>
                    <Nav.Link href="/saved">My Saved Books</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
