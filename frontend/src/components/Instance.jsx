import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Instance = () => {
    const [apiResponseStatus, setApiResponseStatus] = useState(null);
    const { state } = useLocation();
    const { instance } = state;
    const { entityName } = useParams()
    const navigate = useNavigate();

    const deleteInstance = async (entityName, instanceName) => {
        const apiUrl = `http://127.0.0.1:3000/api/instances/${entityName}/${instanceName}`
        try {
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setApiResponseStatus(response.message);
            navigate(`/`);
        } catch (error) {
            setApiResponseStatus(error);
        }
    }


    const handleDelete = (entityName, instanceName) => {
        return () => deleteInstance(entityName, instanceName)
    }

    return (
        <>
            <h1>{instance.name}</h1>
            {
                instance && (
                    Object.keys(instance).map((key) => (
                        key !== "name" && (
                            <p key={key}>
                                <strong>{key}:</strong> {instance[key]}
                            </p>)
                    )
                    )
                )}
            {
                apiResponseStatus && (
                    <p>{apiResponseStatus}</p>
                )
            }
            <button>
                Edit
            </button>

            <button onClick={handleDelete(entityName, instance.name)}>
                Delete
            </button>
        </>
    );
}

export default Instance;
