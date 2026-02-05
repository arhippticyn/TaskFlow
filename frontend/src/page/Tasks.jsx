import { useSelector } from "react-redux";
import AddTask from "../components/AddTask"
import TaskList from "../components/TaskList"
import { selectIsAddPut } from "../redux/selectors";

const Tasks = () => {
  const isAddPut = useSelector(selectIsAddPut);

  return (
    <div>
      Tasks
      {isAddPut ? <AddTask /> : <TaskList />}
    </div>
  );
}

export default Tasks