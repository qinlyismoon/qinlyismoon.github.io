/**
 * Checklist beside live Try-it phones — all steps visible at once.
 * No current/done tracking: the embed can’t report progress, so we
 * don’t pretend to lead the reader through a stepper.
 */
export default function TryTaskList({ tasks }) {
  return (
    <ol className="mm-live__tasks">
      {tasks.map((task, index) => (
        <li key={task} className="mm-live__task">
          <span className="mm-live__task-row">
            <span className="mm-live__task-n" aria-hidden="true">
              {index + 1}
            </span>
            <span className="mm-live__task-text">{task}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
