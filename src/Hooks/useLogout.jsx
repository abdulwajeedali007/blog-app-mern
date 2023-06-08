import { usePostContext } from "../Context";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
export function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: postDispatch } = usePostContext();
  const logout = () => {
    //  remove user from Storage
    localStorage.removeItem("user");
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    postDispatch({ type: "ALL_MY_POSTS", payload: [] });
    toast.info("Logout successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
    });
  };
  return { logout };
}
