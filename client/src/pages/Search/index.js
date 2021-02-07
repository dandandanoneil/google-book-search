import React, { Component } from "react";
import API from "../../utils/API";

// IMPORT COMPONENTS
import Header from "../../components/Header";
import SearchResults from "../../components/SearchResults";

// IMPORT COMPONENTS FROM REACT-BOOTSTRAP
import { Container, Row, Col, FormControl, InputGroup, Button } from "react-bootstrap";

class Search extends Component {
  state = {
    search: "JavaScript",
    results: []
  };

  componentDidMount() {
    this.searchBook(this.state.search);
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
        [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.searchBook(this.state.search);
  };

  formatObject = function(book) {
    const newBook = {
        _id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: "",
        image: "",
        link: book.volumeInfo.previewLink
    }

    if (book.volumeInfo.description) {
      newBook.description = book.volumeInfo.description;
    }
    if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
      newBook.image = book.volumeInfo.imageLinks.thumbnail;
    }
    

    return newBook;
  };
  
  searchBook = function(search) {
    this.setState({ results: [] })
    API.getBook(search)
    .then(books => {
      const newResults = books.data.items.map(book => this.formatObject(book));
      this.setState({ results: newResults })
    }).catch(err => console.error(err));

  }

  render() {
    return (
      <>
        <Header>Search for Books</Header>
        <Container>
          <Row className="justify-content-sm-center mb-3">
            <Col sm="6">
              <InputGroup className="mb-3">
                <FormControl
                    type="text" 
                    placeholder="Search for a book"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleChange}
                />
                <InputGroup.Append>
                  <Button 
                      onClick={this.handleSubmit}
                      className="ml-auto"
                      style={{ backgroundColor: "#2ab4e3" }}
                  >Search</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <SearchResults results={this.state.results} />

        </Container>
      </>
    );
  }
}

export default Search;
