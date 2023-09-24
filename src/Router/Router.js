import {createBrowserRouter} from "react-router-dom";
import PostsPage from "../Components/PostsPage";
import NewPostPage from "../Components/NewPostPage";

export const router = createBrowserRouter([
  {
    path: '/posts',
    element: <PostsPage />,
  },
  {
    path: '/posts/new',
    element: <NewPostPage />,
  }
])