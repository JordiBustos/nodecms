import { useLocation } from "react-router-dom";

const Instance = () => {
    const { state } = useLocation();
    console.log(state)
    const { instance } = state; // Corrected to use 'instance' instead of 'value'

    console.log(instance);

    return (
        <>
            <h1>Instance</h1>
            {
                instance && (
                    Object.keys(instance).map((key) => (
                        <p key={key}>
                            <strong>{key}:</strong> {instance[key]}
                        </p>
                    )
                    )
                )}
        </>
    );
}

export default Instance;
