import React, { useState } from "react";

const Form = () => {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            author,
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:3000/api/instances/Pepe",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                console.log("Form submitted successfully");
            } else {
                console.error("Failed to submit form");
            }
        } catch (error) {
            console.error("Failed to submit form", error);
        }
    };

    return (
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
                author:
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
