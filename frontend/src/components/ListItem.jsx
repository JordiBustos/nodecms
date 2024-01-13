import { Link } from "react-router-dom";

const ListItem = ({ name, state = null }) => {
  return <li> {createLink(name, state)} </li>;
}

function createLink(entityName, state) {
  return (
    <Link to={entityName} state={{ name: entityName, instance: state ? state : null }}>
      {entityName}
    </Link>
  );
}

export default ListItem;