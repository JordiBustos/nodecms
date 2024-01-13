import React, { useState } from "react";

const EntitiesForm = ({ onAddEntity }) => {
    const [name, setName] = useState("");
    const [fields, setFields] = useState([{ field_name: "", field_type: "TEXT" }]);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const handleAddField = () => {
        setFields([...fields, { field_name: "", field_type: "TEXT" }]);
    };

    const handleDeleteField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldNames = fields.map((field) => field.field_name);
        const fieldTypes = fields.map((field) => field.field_type);

        const data = {
            name,
            fields_names: fieldNames,
            fields_types: fieldTypes,
        };

        try {
            const response = await fetch("http://127.0.0.1:3000/api/entities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmissionStatus("success");
                setName("");
                setFields([{ field_name: "", field_type: "TEXT" }]);
                onAddEntity();
            } else {
                setSubmissionStatus("error");
            }
        } catch (error) {
            console.error("Failed to submit form", error);
            setSubmissionStatus("error");
        }
    };

    return (
        <>
            <h2>Create new Entity</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Fields:
                    {fields.map((field, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Field Name"
                                value={field.field_name}
                                onChange={(e) => handleFieldChange(index, "field_name", e.target.value)}
                            />
                            <select
                                value={field.field_type}
                                onChange={(e) => handleFieldChange(index, "field_type", e.target.value)}
                            >
                                <option value="TEXT">TEXT</option>
                                <option value="INT">INT</option>
                            </select>
                            <button type="button" onClick={() => handleDeleteField(index)}>
                                Delete Field
                            </button>
                        </div>
                    ))}
                </label>
                <button type="button" onClick={handleAddField}>
                    Add Field
                </button>
                <button type="submit">Submit</button>

                {submissionStatus === "success" && <p>Entity added successfully!</p>}
                {submissionStatus === "error" && <p>Something went wrong. Please try again.</p>}
            </form>
        </>
    );
};

export default EntitiesForm;
