import axios from "axios";

export const loadAllAuthors = dispatch => {
  axios({
    url: "http://localhost:4000/graphql",
    method: "post",
    data: {
      query: `{authors {id, name, age, gender, description}}`
    }
  })
    .then(res => {
      if (res.data.data)
        dispatch({ type: "UPDATE_AUTHORS_DATA", payload: res.data.data.authors });
    })
    .catch(err => {
      console.log(err);
    });
};
