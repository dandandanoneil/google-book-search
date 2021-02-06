import React, { Component } from "react";
import API from "../../utils/API";

// IMPORT COMPONENTS
import Header from "../../components/Header";
import SearchResults from "../../components/SearchResults";

// IMPORT COMPONENTS FROM REACT-BOOTSTRAP
import { Container, Row, Col, Form, Button } from "react-bootstrap";

class Search extends Component {
  state = {
    search: "Cher",
    results: []
  };

  componentDidMount() {
    this.searchBook();
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
        [name]: value
    });
  };

  handleSubmit = function(event) {
    event.preventDefault();
    this.searchBook(this.state.search);
  };

  formatObject = function(book) {
    const newBook = {
        _id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks.thumbnail,
        link: book.volumeInfo.previewLink
    }

    return newBook;
  };
  
  searchBook = function(search) {
    console.log("Making an API call to search for", search);
    API.getBook(search)
    .then(books => {
      console.log("API call returned", books);
      this.setState({
        results: books.data.items.map(book => this.formatObject(book))
      })})
    .catch(err => console.error(err));

  }

  render() {
    return (
      <>
        <Header>Search for Books</Header>
        <Container>
          <Row className="justify-content-sm-center mb-3">
            <Col sm="4">
              <Form inline>
                <Form.Control  
                  type="text" 
                  placeholder="Search for a book"
                  name="search"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
                <Button 
                  onSubmit={this.handleSubmit}
                  className="ml-auto"
                  style={{ backgroundColor: "#2ab4e3" }}
                >Search</Button>
              </Form>
            </Col>
          </Row>

          <SearchResults results={this.state.results} />

        </Container>
      </>
    );
  }
}

export default Search;
