import EntitiesForm from "./EntitiesForm";
import { useState } from "react";
import SearchBar from "./SearchBar";
import filterByName from "../utils/filterByName";
import ListItem from "./ListItem";
import backendUrl from "../constants/backend";

const EntitiesList = ({ data, onChangeData }) => {
	const [showForm, setShowForm] = useState(false);
	const [inputText, setInputText] = useState("");
	const [apiResponseStatus, setApiResponseStatus] = useState(null);

	const onDelete = async (entityName) => {
		try {
			const response = await fetch(`${backendUrl}/entities/${entityName}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			setApiResponseStatus(response.message);
			onChangeData();
		} catch (error) {
			setApiResponseStatus(error);
		}
	};

	return (
		<div>
			<SearchBar setInputText={setInputText} />
			<h1>Entities List</h1>
			<ul>
				{data &&
					filterByName(data.value, inputText).map((item) =>
						<ListItem key={item.name} name={item.name} onDelete={() => onDelete(item.name)} />
					)}
			</ul>
			{showForm && <EntitiesForm onAddEntity={onChangeData} />}
			{apiResponseStatus && <p>{apiResponseStatus}</p>}
			<button onClick={() => setShowForm(!showForm)}>
				{showForm ? "Hide form" : "Add New Entity"}
			</button>
		</div>
	);
};

export default EntitiesList;
