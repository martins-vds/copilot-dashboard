import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
    const navigate = useNavigate();

    return (
        <Button variant='contained' color="success" onClick={() => navigate("/dashboard")}>
            Get Started
        </Button>
    )
}