import { useState } from 'react';
import useApiFetch from '../hooks/useApiFetch';
import d from '../constants/typeToForm';

const InstanceForm = ({ instanceName, onAddInstance }) => {
    const apiUrl = `http://127.0.0.1:3000/api/entities/${instanceName}`;
    const { data, loading, error } = useApiFetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/instances/${instanceName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add instance');
            }

            setSuccessMessage('Instance added successfully');
            setErrorMessage('');
            setFormData({});
            onAddInstance();

        } catch (error) {
            setErrorMessage('Error adding instance');
            setSuccessMessage('');
            console.error('Error adding instance:', error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error && !data) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <h2>Create new {instanceName}</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                {data && (
                    <>
                        {data.value.fields_names.map((name, index) => (
                            <div key={index}>
                                <label htmlFor={name}>{name}</label>
                                <input
                                    type={d[data.value.fields_types[index]]}
                                    id={name}
                                    name={name}
                                    value={formData[name] || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </>
                )}
                <button type="submit">Add</button>
            </form>
        </>
    );
};

export default InstanceForm;