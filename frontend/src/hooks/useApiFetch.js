import { useState, useEffect } from "react";

const useApiFetch = (url, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorMessage = `Failed to fetch data: ${response.statusText}`;
          setError(errorMessage);

          if (response.status === 404) {
            setError("Not Found - No elements found");
          }

          throw new Error(errorMessage);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...(Array.isArray(dependencies) ? dependencies : [])]);

  return { data, loading, error };
};

export default useApiFetch;
