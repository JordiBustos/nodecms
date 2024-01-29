import { Link } from "react-router-dom";
import propTypes from "prop-types";

const ListItem = ({ name, state = null, onDelete }) => {
  return (
    <li>
      {createLink(name, state)}
      <button
        onClick={onDelete}
        style={{ color: "red", background: "transparent" }}
      >
        ✖
      </button>
    </li>
  );
};

function createLink(entityName, state) {
  return (
    <Link
      to={entityName}
      state={{ name: entityName, instance: state ? state : null }}
    >
      {entityName}
    </Link>
  );
}

ListItem.propTypes = {
  name: propTypes.string.isRequired,
  state: propTypes.object,
  onDelete: propTypes.func.isRequired,
};

export default ListItem;

