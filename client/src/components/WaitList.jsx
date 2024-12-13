// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const [isNew, setIsNew] = useState(true);
// const params = useParams();
// const navigate = useNavigate();

// useEffect(() => {
//     async function fetchData() {
//         const id = params.id?.toString() || undefined;
//         if (!id) return;
//         setIsNew(false);
//         const response = await fetch(
//             `http://localhost:5050/record/${params.id.toString()}`
//         );
//         if (!response.ok) {
//             const message = `An error has occurred: ${response.statusText}`;
//             console.error(message);
//             return;
//         }
//         const record = await response.json();
//         if (!record) {
//             console.warn(`Record with id ${id} not found`);
//             navigate("/");
//             return;
//         }
//         setForm(record);
//     }
//     fetchData();
//     return;
// }, [params.id, navigate]);
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WaitList = () => {
    const [displayId, setDisplayId] = useState("");
    const [lastName, setLastName] = useState("");
    const [record, setRecord] = useState(null);
    const [waitingTime, setWaitingTime] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!displayId || !lastName) return;

        console.log("displayId", displayId);
        console.log("lastName", lastName);

        const response = await fetch(`http://localhost:5050/record?displayId=${displayId}&lastName=${lastName}`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            console.error(message);
            return;
        }

        const record = await response.json();
        if (!record) {
            console.warn(`Record with displayId ${displayId} and lastName ${lastName} not found`);
            navigate("/");
            return;
        }

        console.log("Record", record);
        const records = record;
        
        setRecord(records);
        console.log("Stringed JSON ", JSON.stringify(records.checkedInTime));
        console.log("Date calculate ", new Date(records.checkedInTime).toLocaleString("en-CA"));
        console.log("Date from hard-code ", new Date(1734028861428).toLocaleString("en-CA"));

        setWaitingTime(timeCalculator(records.checkedInTime));
    };

    return (
        <div>
            <h1>Check Wait Time</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="displayId">Display ID:</label>
                    <input
                        type="number"
                        id="displayId"
                        value={displayId}
                        onChange={(e) => setDisplayId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Check Wait Time</button>
            </form>
            {record && (
                <div>
                    <h2>Patient Information</h2>
                    <p>First Name: {record.firstName}</p>
                    <p>Last Name: {record.lastName}</p>
                    <p>Checked In Time: {new Date(record.checkedInTime).toLocaleString("en-CA")}</p>
                    <p>Waiting Time: {waitingTime} hours</p>
                </div>
            )}
        </div>
    );
};

function timeCalculator(checkIn) {
    const thePresent = Date.now();
    console.log(thePresent);
    console.log(checkIn);
    const timeWaiting = thePresent - checkIn;
    console.log(timeWaiting);
    return Math.floor(timeWaiting/( 60 * 60 * 1000 )); // return time waiting in hours
} 
export default WaitList;
