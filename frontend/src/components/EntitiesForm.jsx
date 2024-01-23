import React, { useState } from "react";
import backendUrl from "../constants/backend";
import d from "../constants/typeToForm";

const EntitiesForm = ({ onAddEntity }) => {
	const [name, setName] = useState("");
	const [fields, setFields] = useState([{ field_name: "", field_type: "TEXT" }]);
	const [submissionStatus, setSubmissionStatus] = useState(null);
	const [currentFieldType, setCurrentFieldType] = useState("TEXT");

	const handleFieldChange = (index, key, value) => {
		const updatedFields = [...fields];
		updatedFields[index][key] = value;
		setFields(updatedFields);
	};

	const handleAddField = () => {
		setFields([...fields, { field_name: "", field_type: currentFieldType }]);
	};

	const handleDeleteField = (index) => {
		const updatedFields = [...fields];
		updatedFields.splice(index, 1);
		setFields(updatedFields);
	};

	const renderInputField = (field) => {
		const field_type = field.field_type;
		if (field_type === "TEXT" || field_type === "CHAR" || field_type === "VARCHAR")
			return (
				<input
					maxLength={field.form_type === "CHAR" ? 1 : 255}
					type="text"
					placeholder="Enter text"
					value={field.field_name}
					onChange={(e) => handleFieldChange(fields.indexOf(field), "field_name", e.target.value)}
				/>
			);
		else if (field_type === "NUMBER" || field_type === "INT" || field_type === "FLOAT")
			return (
				<input
					type="number"
					placeholder="Enter number"
					value={field.field_name}
					onChange={(e) => handleFieldChange(fields.indexOf(field), "field_name", e.target.value)}
				/>
			);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fieldNames = fields.map((field) => field.field_name);
		const fieldTypes = fields.map((field) => field.field_type);
		const formTypes = fields.map((field) => field.form_type);

		const data = {
			name,
			fields_names: fieldNames,
			fields_types: fieldTypes,
			form_types: formTypes,
		};

		try {
			const response = await fetch(`${backendUrl}/entities`, {
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
					<input placeholder="Entity Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
							{renderInputField(field)}
							{fields.length > 1 && (
								<button type="button" onClick={() => handleDeleteField(index)}>
									Delete Field
								</button>
							)}
						</div>
					))}
				</label>
				<select
					value={currentFieldType}
					onChange={(e) => setCurrentFieldType(e.target.value)}
				>
					{Object.keys(d).map((key, index) => (
						<option key={index} value={key}>
							{key}
						</option>
					))}
				</select>
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
