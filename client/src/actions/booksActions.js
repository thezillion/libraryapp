import axios from "axios";

export const loadAllBooks = dispatch => {
  axios({
    url: "http://localhost:4000/graphql",
    method: "post",
    data: {
      query: `{books {id, name, description, author {id, name, description}}}`
    }
  })
    .then(res => {
      if (res.data.data)
        dispatch({ type: "UPDATE_BOOKS_DATA", payload: res.data.data.books });
    })
    .catch(err => {
      console.log(err);
    });
};
