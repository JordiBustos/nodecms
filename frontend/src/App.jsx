import "./App.css";
import useApiFetch from "./hooks/useApiFetch";
import Form from "./components/Form";

function App() {
  const apiUrl = "http://127.0.0.1:3000/api/entities";
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
      <Form />
    </div>
  );
}

export default App;
