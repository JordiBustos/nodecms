import "./App.css";
import useApiFetch from "./hooks/useApiFetch";

function App() {
  const apiUrl = "http://127.0.0.1:8080/api/instances/cantantes";
  const { data, loading, error } = useApiFetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error && !data) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data)
  return (
    <div>
      {data && (
        <ul>
          {data.value.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
