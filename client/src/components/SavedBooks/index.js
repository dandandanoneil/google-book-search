import React, { Component } from "react";
import API from "../../utils/API";

// IMPORT COMPONENTS FROM REACT-BOOTSTRAP
import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";

class SavedBooks extends Component {
    state = {
        savedBooks: []
    }

    componentDidMount() {
        this.updateSavedBooks();
    }
    
    updateSavedBooks() {
        API.getBooks()
        .then(res => { this.setState({ savedBooks: res.data }) })
        .catch(err => console.error(err));
    }

    handleUnsave = (event) => {
        API.deleteBook(event.target.id)
            .then(res => {
                console.log("Deleted book:", res);
                this.updateSavedBooks();
            })
            .catch(err => console.error(err));
    }

    render() {
        const foundBooks = (this.state.savedBooks.length > 0);
        console.log("foundBooks?", foundBooks);
        console.log("savedBooks:", this.state.savedBooks);

        return (
            <>
                {!foundBooks ? 
                <Container className="text-center">
                    <h5 style={{  color: "#2ab4e3"  }}>No Saved Books Found</h5>
                </Container>
                :
                <Container>
                    {this.state.savedBooks.map(book => (
                        <Card key={book._id}>
                            <Row>
                                <Col sm={2}>
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        rounded
                                        fluid
                                        style={{ display: "block", margin: "auto" }}
                                    />
                                </Col>
                                <Col sm={10}>
                                    <h5>{book.title}</h5>
                                    <h6>by {book.authors}</h6>
                                    <p>{book.description}</p>
                                    <Button
                                        href={book.link}
                                        target="blank"
                                        className="mr-2 mb-2"
                                        style={{ backgroundColor: "#f3d366" }}
                                    >Book Info from Google</Button>
                                    <Button
                                        onClick={this.handleUnsave}
                                        id={book._id}
                                        className="mr-2 mb-2"
                                        style={{ backgroundColor: "#bc6fcd" }}
                                    >Unsave from My Books</Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Container>
                }
            </>
        );
    }
}

export default SavedBooks;
