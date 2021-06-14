import Card from "../Card/Card";

import styles from "./UsersList.module.css";

function UsersList(props) {
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user, index) => (
          <li key={`u${index}`}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default UsersList;
