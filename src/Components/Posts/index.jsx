import { useEffect } from "react";
import Post from "./Post";
import { usePostContext } from "../../Context";
function Index() {
  const { posts, dispatch } = usePostContext();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
      // headers: { authorization: `bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: "ALL_POSTS", payload: result });
      })
      .catch((error) => console.log(error));
  }, [dispatch]);
  return <Post posts={posts} />;
}
export default Index;
