import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetTasks } from '../redux/operation';
import TaskCard from './TaskCard';
import { selectIsAddPut, selectTasks } from '../redux/selectors';
import styles from '../styles/Tasks.module.css';
import AddTask from './AddTask';
import { selectAddPage, selectPage } from '../redux/TasksSlice';


const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetTasks())
  }, [dispatch])
  return (
    <div>
      <div className={styles.tasksInfo}>
        <h2>TaskList:</h2>
        <button className={styles.taskAddBtn} onClick={() => dispatch(selectAddPage())}>
          +
        </button>
      </div>
      <ul className={styles.tasks}>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
