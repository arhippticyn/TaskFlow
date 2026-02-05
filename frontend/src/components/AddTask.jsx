import { AddTasks, PutTask } from '../redux/operation';
import { selectTask, selectTaskId } from '../redux/selectors';
import { selectPage } from '../redux/TasksSlice';
import styles from '../styles/Tasks.module.css';
import { useDispatch, useSelector } from 'react-redux';

const AddTask = () => {
  const dispatch = useDispatch();
  const TaskId = useSelector(selectTaskId);
  const task = useSelector(selectTask)
  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    if (TaskId) {
      dispatch(
        PutTask({ id: TaskId, title_new: title, description_new: description })
      );
    } else {
      dispatch(AddTasks({ title: title, description: description }));
    }
    form.reset();
  };
  return (
    <div>
      <h2 className={styles.title}>{TaskId ? 'Edit Task' : 'Add Task'}</h2>

      <button
        className={styles.taskBtnList}
        onClick={() => dispatch(selectPage())}
      >
        Back to tasks
      </button>

      <form className={styles.form} onSubmit={handleAddTask}>
        <label className={styles.label}>Title</label>
        <input
          defaultValue={task?.title || ''}
          type="text"
          name="title"
          className={styles.input}
        />

        <label className={styles.label}>Description</label>
        <input
          defaultValue={task?.description || ''}
          type="text"
          name="description"
          className={styles.input}
        />

        <button className={styles.btn} type="submit">
          {TaskId ? 'Update task' : 'Add task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
