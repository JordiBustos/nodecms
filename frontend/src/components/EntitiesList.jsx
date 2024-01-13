import EntitiesForm from "./EntitiesForm";
import { useState } from "react";
import SearchBar from "./SearchBar";
import filterByName from "../utils/filterByName";
import ListItem from "./ListItem";

const EntitiesList = ({ data, onAddEntity }) => {
	const [showForm, setShowForm] = useState(false);
	const [inputText, setInputText] = useState("");

	return (
		<div>
			<SearchBar setInputText={setInputText} />
			<h1>Entities List</h1>
			<ul>
				{data &&
					filterByName(data.value, inputText).map((item) =>
						<ListItem key={item.name} name={item.name} />
					)}
			</ul>
			{showForm && <EntitiesForm onAddEntity={onAddEntity} />}
			<button onClick={() => setShowForm(!showForm)}>
				{showForm ? "Hide form" : "Add New Entity"}
			</button>
		</div>
	);
};

export default EntitiesList;
