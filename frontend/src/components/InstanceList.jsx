import { useState, useEffect } from "react";
import useApiFetch from "../hooks/useApiFetch";
import InstanceForm from "./InstanceForm";
import { Link, useLocation } from "react-router-dom";

const InstanceList = () => {
    const [showForm, setShowForm] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const { state } = useLocation();
    const { name } = state;

    const apiUrl = `http://127.0.0.1:3000/api/instances/${name}`;
    const { data, loading, error } = useApiFetch(apiUrl, [refreshData]);

    useEffect(() => {
        if (refreshData) {
            setRefreshData(false);
        }
    }, [refreshData]);

    if (loading) return <p>Loading...</p>;
    return (
        <div>
            <h1>{name} List</h1>
            {
                error && !data ? (
                    <p>{error || "Something went wrong"}</p>
                ) : (
                    <ul>
                        {data && data.map((item) =>
                            <li key={item.name}>
                                <Link to={item.name} state={{ instance: item }} >
                                    {item.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                )
            }
            {showForm && (
                <InstanceForm
                    instanceName={name}
                    onAddInstance={() => setRefreshData(true)}
                />
            )}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide form" : "Add New Instance"}
            </button>
        </div>
    );
};

export default InstanceList;
