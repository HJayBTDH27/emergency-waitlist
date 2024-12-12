import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
    const [form, setForm] = useState({
        triaged: false,
        admitted: false,
        firstName: "",
        lastName: "",
        pronouns: "",
        age: 0,
        biologicalSex: false,
        publicHealthNum: 0,
        privateHealthNum: 0,
        conditionCode: 0,
        conditionType: 0,
        painLevel: 0,
        medications: "",
        medicalPresent: "",
        medicalHistory: "",
        allergies: ""
    });
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
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const person = { ...form };
        try {
            let response;
            if (isNew) {
                response = await fetch("http://localhost:5050/record", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(person),
                });
            } else {
                response = await fetch(`http://localhost:5050/record/${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(person),
                });
            }

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                console.error(message);
                return;
            }

            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    // This following section will display the form that takes the input from the user.
    return (
        <>
            <form onSubmit={onSubmit}>
                <section class="card">
                    <h3>Personal Information</h3>
                    <label for="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your Last Name"
                        value={form.lastName}
                        onChange={(e) => updateForm({ lastName: e.target.value })}
                        required />
                    <label for="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your First Name"
                        value={form.firstName}
                        onChange={(e) => updateForm({ firstName: e.target.value })}
                        required />
                    <label for="pronouns">Pronouns</label>
                    <select
                        id="pronouns"
                        name="pronouns"
                        value={form.pronouns}
                        onchange={(e) => updateForm({ pronouns: e.target.value })}>
                        <option value="she/her">She/Her</option>
                        <option value="he/him">He/Him</option>
                        <option value="they/them">They/Them</option>
                        <option value="xie/hir">Xie/Hir</option>
                        <option value="prefer-not-to-specify">Prefer Not to Specify</option>
                    </select>
                    <label for="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        min="1"
                        value={form.age}
                        onChange={(e) => updateForm({ age: e.target.value })}
                        required />
                    <fieldset>
                        <legend>Sex</legend>
                        <label>Female</label>
                        <input
                            id="sexFemale"
                            name="userSex"
                            type="radio"
                            value="true"
                            checked={form.biologicalSex === true}
                            onChange={(e) => updateForm({ biologicalSex: e.target.value })} />
                        <label>Male</label>
                        <input
                            id="sexMale"
                            name="userSex"
                            type="radio"
                            value="false"
                            checked={form.biologicalSex === false}
                            onChange={(e) => updateForm({ biologicalSex: e.target.value })} />
                    </fieldset>
                    <div>
                        <label htmlFor="publicHealthNum">Public Health Number:</label>
                        <input
                            type="number"
                            id="publicHealthNum"
                            value={form.publicHealthNum}
                            onChange={(e) => updateForm({ publicHealthNum: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="privateHealthNum">Private Health Number:</label>
                        <input
                            type="number"
                            id="privateHealthNum"
                            value={form.privateHealthNum}
                            onChange={(e) => updateForm({ privateHealthNum: e.target.value })}
                        />
                    </div>
                </section>
                {/* <!-- Condition Location Section --> */}
                <section class="card">
                    <h3>Condition Location</h3>
                    <fieldset>
                        <legend>Select All Applicable Locations</legend>
                        <label>Chest</label>
                        <input
                            id="location_chest"
                            name="conditionCode"
                            type="checkbox"
                            value="0"
                            checked={form.conditionCode === 0}
                            onChange={(e) => updateForm({ conditionCode: e.target.value })} />
                        <label>Head</label>
                        <input
                            id="location_head"
                            name="conditionCode"
                            type="checkbox"
                            value="1"
                            checked={form.conditionCode === 1}
                            onChange={(e) => updateForm({ conditionCode: e.target.value })} />
                        <label>Abdomen</label>
                        <input
                            id="location_Abdomen"
                            name="conditionCode"
                            type="checkbox"
                            value="2"
                            checked={form.conditionCode === 2}
                            onChange={(e) => updateForm({ conditionCode: e.target.value })} />
                        <label>Pelvis</label>
                        <input
                            id="location_Pelvis"
                            name="conditionCode"
                            type="checkbox"
                            value="3"
                            checked={form.conditionCode === 3}
                            onChange={(e) => updateForm({ conditionCode: e.target.value })} />
                        <label>Arms / Legs</label>
                        <input
                            id="location_armsLegs"
                            name="conditionCode"
                            type="checkbox"
                            value="4"
                            checked={form.conditionCode === 4}
                            onChange={(e) => updateForm({ conditionCode: e.target.value })} />
                        <label>Hands / Feet</label>
                        <input
                            id="location_handsFeet"
                            name="conditionCode"
                            type="checkbox"
                            value="5"
                            checked={form.conditionCode === 5}
                            onChange={(e) => updateForm({ conditionCode: e.target.value })} />
                    </fieldset>
                </section>
                {/* <!-- Condition Type Section --> */}
                <section class="card">
                    <h3>Condition Type</h3>
                    <fieldset>
                        <legend>Select the Type(s) of Condition</legend>
                        <label>Wound</label>
                        <input
                            id="wound"
                            name="conditionType"
                            type="radio"
                            value="0"
                            checked={form.conditionType === 0}
                            onChange={(e) => updateForm({ conditionType: e.target.value })} />
                        <label>Pain</label>
                        <input
                            id="Pain"
                            name="conditionType"
                            type="radio"
                            value="1"
                            checked={form.conditionType === 1}
                            onChange={(e) => updateForm({ conditionType: e.target.value })} />
                        <label>Illness</label>
                        <input
                            id="Illness"
                            name="conditionType"
                            type="radio"
                            value="2"
                            checked={form.conditionType === 2}
                            onChange={(e) => updateForm({ conditionType: e.target.value })} />
                    </fieldset>
                </section>
                {/* <!-- Pain Level Section --> */}
                <section class="card">
                    <h3>Pain Level</h3>
                    <fieldset>
                        <legend>Rate your pain level (1-10):</legend>
                        <p>1 = Minimal Pain, 5 = Moderate Pain, 10 = Severe Pain</p>
                        <label>1</label>
                        <input
                            id="painLevel1"
                            name="painLevel"
                            type="radio"
                            value="1"
                            checked={form.painLevel === 1}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>2</label>
                        <input
                            id="painLevel2"
                            name="painLevel"
                            type="radio"
                            value="2"
                            checked={form.painLevel === 2}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>3</label>
                        <input
                            id="painLevel3"
                            name="painLevel"
                            type="radio"
                            value="3"
                            checked={form.painLevel === 3}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>4</label>
                        <input
                            id="painLevel4"
                            name="painLevel"
                            type="radio"
                            value="4"
                            checked={form.painLevel === 4}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>5</label>
                        <input
                            id="painLevel5"
                            name="painLevel"
                            type="radio"
                            value="5"
                            checked={form.painLevel === 5}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>6</label>
                        <input
                            id="painLevel6"
                            name="painLevel"
                            type="radio"
                            value="6"
                            checked={form.painLevel === 6}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>7</label>
                        <input
                            id="painLevel7"
                            name="painLevel"
                            type="radio"
                            value="7"
                            checked={form.painLevel === 7}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>8</label>
                        <input
                            id="painLevel8"
                            name="painLevel"
                            type="radio"
                            value="8"
                            checked={form.painLevel === 8}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>9</label>
                        <input
                            id="painLevel9"
                            name="painLevel"
                            type="radio"
                            value="9"
                            checked={form.painLevel === 9}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                        <label>10</label>
                        <input
                            id="painLevel10"
                            name="painLevel"
                            type="radio"
                            value="10"
                            checked={form.painLevel === 10}
                            onChange={(e) => updateForm({ painLevel: e.target.value })} />
                    </fieldset>
                </section>
                {/* <!-- Medical History Section --> */}
                <section class="card">
                    <h3>Medical History</h3>
                    <label for="medicalHistory">Past Medical Conditions</label>
                    <input
                        type="text"
                        name="medicalHistory"
                        id="medicalHistory"
                        placeholder="Enter your Medical History"
                        value={form.medicalHistory}
                        onChange={(e) => updateForm({ medicalHistory: e.target.value })} />
                    <label for="currentConditions">Current Medical Conditions</label>
                    <input
                        type="text"
                        name="currentConditions"
                        id="currentConditions"
                        placeholder="Enter your Current Conditions"
                        value={form.currentConditions}
                        onChange={(e) => updateForm({ currentConditions: e.target.value })} />
                    <label for="currentMedications">Current Medications</label>
                    <input
                        type="text"
                        name="currentMedications"
                        id="currentMedications"
                        placeholder="Enter your Medications"
                        value={form.medications}
                        onChange={(e) => updateForm({ medications: e.target.value })} />
                    <label for="allergies">Allergies</label>
                    <input
                        type="text"
                        name="allergies"
                        id="allergies"
                        placeholder="Enter your Allergies"
                        value={form.allergies}
                        onChange={(e) => updateForm({ allergies: e.target.value })} />
                </section>
                <input
                    type="submit"
                    value="Save Patient Record"
                />
            </form>
        </>
    );
}