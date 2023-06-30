/** AUTH FORM - PURE COMPONENT */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth(props) {
    const isAuthenticated = useSelector((store) => store.authStore.isAuthenticated);
    console.log("props", props);
    return isAuthenticated ? props.children : <Navigate to="/" />
}