import "./App.css";
import { useEffect, useState } from "react";
import useApiFetch from "./hooks/useApiFetch";
import EntitiesList from "./components/EntitiesList";
import InstanceList from "./components/InstanceList";
import { Route, Routes } from "react-router-dom";
import Instance from "./components/Instance";

function App() {
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => { // called when a new entity is created to show new entity in the list
    if (refreshData) {
      setRefreshData(false);
    }
  }, [refreshData]);

  const apiUrl = "http://127.0.0.1:3000/api/entities";
  const { data, loading, error } = useApiFetch(apiUrl, [refreshData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error && !data) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Routes>
        <Route path="/:entityName" element={<InstanceList />} />
        <Route path="/" element={<EntitiesList data={data} onAddEntity={() => setRefreshData(true)} />} />
        <Route path="/:entityName/:name" element={<Instance />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
