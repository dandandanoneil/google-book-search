import React, { Component } from "react";
import API from "../../utils/API";

// IMPORT COMPONENTS FROM REACT-BOOTSTRAP
import { Card, Row, Col, Button, Image } from "react-bootstrap";

class SearchResults extends Component {
    state = {
        savedBooks: []
    }

    componentDidMount() {
        API.getBooks()
            .then(results => this.setState({ savedBooks: results }))
            .catch(err => console.error(err));
    }

    handleSave = (book) => {
        const books = this.state.savedBooks;
        
        API.saveBook(book)
            .then(book => this.setState({ 
                savedBooks: books.push(book) 
            }))
            .catch(err => console.error(err));
    }
    
    render() {
        return (
            <>
                {!this.props.results ? 
                <h5 style={{  color: "#2ab4e3"  }}>No Results Found</h5>
                :
                this.props.results.map(book => (
                    <Card className="justify-content-sm-center m-3 p-3" key={book._id}>
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
                                style={{ backgroundColor: "#f590b2" }}
                                >Book Info from Google</Button>
                                <Button
                                onClick={() => this.handleSave(book)}
                                className="mr-2 mb-2"
                                style={{ backgroundColor: "#2ab4e3" }}
                                >Save to My Books</Button>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </>
        );
    }
}

export default SearchResults;
