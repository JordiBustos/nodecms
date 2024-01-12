import useApiFetch from "../hooks/useApiFetch"

const InstanceList = ({ instanceName }) => {
    const apiUrl = "http://127.0.0.1:3000/api/instances/" + instanceName;
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

    return (
        <div>
            <h1>{instanceName} List</h1>
            <ul>
                {data && (
                    data.map((item) => (
                        <li key={item.name}>
                            {item.name}
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default InstanceList;