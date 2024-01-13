import useApiFetch from "../hooks/useApiFetch";
import EntitiesForm from "./EntitiesForm";
import { Link } from "react-router-dom";
import { useState } from "react";


const EntitiesList = ({ data, onAddEntity }) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <h1>Entities List</h1>
            <ul>
                {data && (
                    data.value.map((item) => (
                        <li key={item.name}>
                            <Link to={item.name}>{item.name}</Link>
                        </li>
                    ))
                )}
            </ul>
            {showForm && <EntitiesForm onAddEntity={onAddEntity} />}
            <button onClick={() => setShowForm(!showForm)}>{showForm ? "Hide form" : "Add New Entity"}</button>
        </div>
    )
}

export default EntitiesList;