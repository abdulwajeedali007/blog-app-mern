import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
export function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (user) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(data.message);
    }
    if (response.ok) {
      setError(null);
      setLoading(null);
      // storing data into localstorage.
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      toast.success("Signup successfull!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
  };

  return { signup, error, loading };
}
