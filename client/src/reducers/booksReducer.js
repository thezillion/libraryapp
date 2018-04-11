export default function reducer(
  state = {
    data: []
  },
  action
) {
  switch (action.type) {
    case "UPDATE_BOOKS_DATA": {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}
