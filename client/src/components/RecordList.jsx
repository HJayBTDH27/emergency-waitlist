import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>
      {props.record.firstName}
    </td>
    <td>
      {props.record.lastName}
    </td>
    <td>
      {props.record.urgency}
    </td>
    <td>
      {props.record.severity}
    </td>
    <td>
      {props.record.triaged}
    </td>
    <td>
      {props.record.admitted}
    </td>
    <td>
      <div>
        <Link
          to={`/admin/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          color="red"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <h3>Patient Records</h3>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th >
                  First Name
                </th>
                <th>
                  Last Name
                </th>
                <th>
                  Urgency
                </th>
                <th>
                  Severity
                </th>
                <th>
                  Triaged
                </th>
                <th>
                  Admitted
                </th>
              </tr>
            </thead>
            <tbody>
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}