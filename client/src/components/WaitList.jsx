import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const [isNew, setIsNew] = useState(true);
const params = useParams();
const navigate = useNavigate();

useEffect(() => {
    async function fetchData() {
        const id = params.id?.toString() || undefined;
        if (!id) return;
        setIsNew(false);
        const response = await fetch(
            `http://localhost:5050/record/${params.id.toString()}`
        );
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            console.error(message);
            return;
        }
        const record = await response.json();
        if (!record) {
            console.warn(`Record with id ${id} not found`);
            navigate("/");
            return;
        }
        setForm(record);
    }
    fetchData();
    return;
}, [params.id, navigate]);

