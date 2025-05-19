import css from './footer.module.scss';
import { useTasks } from "../../hooks/tasks/use-task";

export const Footer = (props) => {
    const {getActiveTaskCount, getFinishedTaskCount} = useTasks();

    return (
        <footer className={css.footer}>
            <span>Active tasks: {getActiveTaskCount()}</span>
            <span>Finished tasks: {getFinishedTaskCount()}</span>
        </footer>
    )
}