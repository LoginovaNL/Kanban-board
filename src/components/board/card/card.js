import {useParams, useNavigate} from "react-router-dom";
import {IconRemove} from "../../shared/icons/remove";
import {useTasks} from "../../../hooks/tasks/use-task";
import {useEffect, useState} from "react";
import css from "./card.module.scss";

export const Card = () => {
    const navigate = useNavigate();
    const {getTaskById, updateTask} = useTasks();
    const {cardId} = useParams();
    const [task, setTask] = useState();

    useEffect(() => {
        if (cardId) {
            setTask(getTaskById(cardId))
        }
    }, [cardId, getTaskById])

    const navigateBack = () => navigate(-1);

    return (
        <div className={css.card}>
            {task &&
            <div className={css.body}>
                <textarea className={css.name}
                 value={task.name}
                 onChange={(e) =>
                  setTask({
                    ...task,
                    name: e.target.value
                  })}
                />
                <textarea placeholder="This task has no description" className={css.description}
                          onChange={(e) =>
                            setTask({
                                ...task,
                                description: e.target.value
                            })
                          }
                          value={task.description}
                />
            </div>                    
            }
            <button className={css['button-close']} onClick={navigateBack}>
                <IconRemove/>
            </button>
            <div className={css.footer}>
                <button className={css['button-savecard']} onClick={() => {
                    updateTask(task);
                    navigateBack();
                }}>Save card</button>
            </div>
        </div>
    )
}