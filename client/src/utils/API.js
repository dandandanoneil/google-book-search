import axios from "axios";

export default {
  // Gets all saved books from the db
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Searches the Google Books API
  getBook: function(query) {
    console.log("Making an axios call to the Google Books API for", query)
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
