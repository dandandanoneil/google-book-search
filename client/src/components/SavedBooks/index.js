import React, { Component } from "react";
import API from "../../utils/API";

// IMPORT COMPONENTS FROM REACT-BOOTSTRAP
import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";

class SavedBooks extends Component {
    state = {
        savedBooks: []
    }

    componentDidMount() {
        console.log("Making an API call to get saved books");
        API.getBooks()
            .then(results => {
                console.log("API call returned", results);
                this.setState({ savedBooks: results.data });
            })
            .catch(err => console.error(err));
    }

    handleUnsave = (book) => {
        const books = this.state.savedBooks;

        API.deleteBook(book._id)
            .then(deletedBook => this.setState({
                savedBooks: books.filter(book => book._id !== deletedBook._id) 
            }))
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
                                        style={{ backgroundColor: "#f3d366" }}
                                    >Book Info from Google</Button>
                                    <Button
                                        onClick={() => this.handleUnsave(book)}
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
