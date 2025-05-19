import css from './layout.module.scss';
import { TaskProvider } from "../../hooks/tasks/task-provider";
import { LayoutProvider } from '../../hooks/layout/layout-provider';


export const Layout = (props) => {
    return (
        <TaskProvider>
            <LayoutProvider>
        <div className={css.layout}>
            {props.children}
        </div>
            </LayoutProvider>
        </TaskProvider>
    )
}