import { createContext, useReducer, useContext } from "react";

const postContext = createContext();

const initialState = { posts: [], myposts: [], editId: null };

const postReducer = (state, action) => {
  switch (action.type) {
    case "ALL_POSTS":
      return { ...state, posts: action.payload };
    case "ALL_MY_POSTS":
      return { ...state, myposts: action.payload };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        editId: null,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        myposts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "DELETE_MY_POST":
      return {
        ...state,
        myposts: state.myposts.filter((post) => post._id !== action.payload),
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "UPDATE_POST_ID":
      return {
        ...state,
        editId: action.payload,
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? action.payload : post
        ),
        myposts: state.posts.map((post) =>
          post._id === action.payload.id ? action.payload : post
        ),
        editId: null,
      };
    default:
      return state;
  }
};
export function Context({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <postContext.Provider value={{ ...state, dispatch }}>
      {children}
    </postContext.Provider>
  );
}

export const usePostContext = () => {
  return useContext(postContext);
};
