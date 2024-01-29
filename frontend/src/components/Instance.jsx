import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import backendUrl from "../constants/backend";

const Instance = () => {
  const [apiResponseStatus, setApiResponseStatus] = useState(null);
  const { state } = useLocation();
  if (!state) {
    return <h1>Something went wrong :(</h1>;
  }
  const { instance } = state;
  const { entityName } = useParams();
  const navigate = useNavigate();

  const deleteInstance = async (entityName, instanceName) => {
    const apiUrl = `${backendUrl}/instances/${entityName}/${instanceName}`;
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
  };

  const handleDelete = (entityName, instanceName) => {
    return () => deleteInstance(entityName, instanceName);
  };

  return (
    <section>
      <h1>{instance.name}</h1>
      {instance && renderKeys(instance)}
      {apiResponseStatus && <p>{apiResponseStatus}</p>}
      <button>Edit</button>

      <button onClick={handleDelete(entityName, instance.name)}>Delete</button>
    </section>
  );
};

function renderKeys(instance) {
  return getKeys(instance).map((key) => createKeyValueParagraph(instance, key));
}

function createKeyValueParagraph(instance, key) {
  return (
    <p key={key}>
      <strong>{key}:</strong> {instance[key]}
    </p>
  );
}

const getKeys = (instance) =>
  Object.keys(instance).filter((key) => key !== "name");

export default Instance;
