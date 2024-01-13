import { Link } from "react-router-dom";

const ListItem = ({ name, state = null, onDelete }) => {
  return (
    <li>
      {createLink(name, state)}
      <button onClick={onDelete} style={{ color: "red", background: "transparent" }}>
        ✖
      </button>
    </li>
  );
}

function createLink(entityName, state) {
  return (
    <Link to={entityName} state={{ name: entityName, instance: state ? state : null }}>
      {entityName}
    </Link>
  );
}

export default ListItem;