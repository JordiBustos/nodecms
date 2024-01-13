import { useState, useEffect } from "react";
import useApiFetch from "../hooks/useApiFetch";
import InstanceForm from "./InstanceForm";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import backendUrl from "../constants/backend";
import filterByName from "../utils/filterByName";
import ListItem from "./ListItem";

const InstanceList = () => {
  const [showForm, setShowForm] = useState(false);
  const [inputText, setInputText] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const { state } = useLocation();

  if (!state) {
    return <h1>
      Something went wrong :(
    </h1>;
  }
  const { name } = state;

  const apiUrl = `${backendUrl}/instances/${name}`;
  const { data, loading, error } = useApiFetch(apiUrl, [refreshData]);

  useEffect(() => {
    if (refreshData) {
      setRefreshData(false);
    }
  }, [refreshData]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <SearchBar setInputText={setInputText} />
      <h1>{name} List</h1>
      {
        error && !data ? (
          <p>{error || "Something went wrong"}</p>
        ) : (
          <ul>
            {data &&
              filterByName(data, inputText).map((item) =>
                <ListItem key={item.name} name={item.name} state={item} />
              )
            }
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
