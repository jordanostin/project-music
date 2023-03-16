import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    },)

    return null
}