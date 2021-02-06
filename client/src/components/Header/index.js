import React from "react";
import { useLocation } from "react-router-dom";

// IMPORT COMPONENTS FROM REACT-BOOTSTRAP
import { Jumbotron, Card } from "react-bootstrap";

function Header(props) {
    const location = useLocation();
    let imgUrl = ''
    if (location.pathname === "/saved") {
        imgUrl = "https://images.pexels.com/photos/1319855/pexels-photo-1319855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    } else {
        imgUrl = "https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    }

    return (
        <Jumbotron 
            fluid 
            style={{  backgroundImage: 'url(' + imgUrl + ')' }}
        >
            <Card 
                className="p-4 text-center"
                style={{  backgroundColor: "#f590b2", color: "white"  }}
            >
                <h3><em>{props.children}</em></h3>
            </Card>
        </Jumbotron>
    );
}

export default Header;
