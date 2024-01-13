import "./App.css";
import { useEffect, useState } from "react";
import useApiFetch from "./hooks/useApiFetch";
import EntitiesList from "./components/EntitiesList";
import InstanceList from "./components/InstanceList";
import { Route, Routes } from "react-router-dom";

function App() {
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    if (refreshData) {
      setRefreshData(false);
    }
  }, [refreshData]);

  const apiUrl = "http://127.0.0.1:3000/api/entities";
  const { data, loading, error } = useApiFetch(apiUrl, refreshData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error && !data) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Routes>
        {data && (
          data.value.map((item) => (
            <Route key={item.name} path={item.name} element={<InstanceList instanceName={item.name} />} />
          ))
        )}
        <Route path="/" element={<EntitiesList data={data} onAddEntity={() => setRefreshData(true)} />} />
      </Routes>
    </div>
  );
}

export default App;
