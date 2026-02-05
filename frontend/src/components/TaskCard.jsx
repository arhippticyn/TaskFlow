import styles from '../styles/Tasks.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { selectTask } from '../redux/TasksSlice';
import { DeleteTask } from '../redux/operation';

const TaskCard = ({task}) => {
  const dispatch = useDispatch()
  return (
    <li className={styles.task}>
      <div>
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <p className={styles.taskDescription}>{task.description}</p>
      </div>
      

      <div className={styles.utilit}>
        <button className={styles.btnUtilits} onClick={() => dispatch(DeleteTask({id:task.id}))}>
          <MdDeleteForever className={styles.btnUtilitsImage} />
        </button>
        <button className={styles.btnUtilits} onClick={() => dispatch(selectTask(task.id))}>
          <MdModeEdit className={styles.btnUtilitsImage} />
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
