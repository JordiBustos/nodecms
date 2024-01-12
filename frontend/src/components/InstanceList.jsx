import React, { useState, useEffect } from 'react';
import useApiFetch from '../hooks/useApiFetch';
import InstanceForm from './InstanceForm';

const InstanceList = ({ instanceName }) => {
    const [showForm, setShowForm] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const apiUrl = `http://127.0.0.1:3000/api/instances/${instanceName}`;
    const { data, loading, error } = useApiFetch(apiUrl, [refreshData]);

    useEffect(() => {
        if (refreshData) {
            setRefreshData(false);
        }
    }, [refreshData]);

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
            {showForm && <InstanceForm instanceName={instanceName} onAddInstance={() => setRefreshData(true)} />}
            <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide form' : 'Add New Instance'}</button>
        </div>
    );
};

export default InstanceList;
