import Scrollbars from "react-custom-scrollbars-2";
import { Card } from "./card/card";
import css from './column.module.scss';
import { IconButton } from "../../shared/icons/button-add-card";
import { useTasks } from "../../../hooks/tasks/use-task";
import { useState } from "react";


export const Column = (props) => {
    const [isNewTaskInputShown, setIsNewTaskInputShown] = useState(false);
    const [inputCardName, setInputCardName] = useState("");

    const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(undefined);

    const {getTasksByState, getTasksByExcludedState, addTask, moveTask, removeTask} = useTasks();

    const tasks = getTasksByState(props.state);

    const hasTasks = tasks.length > 0;

    const onInputCard = (e) => {
        setInputCardName(e.target.value);
    }
    
    const buttonAddCard = <div><IconButton/>Add card</div>

    return (
        <div className={css.column}>
            <div className={css.header}>{props.name}</div>
            <div className={css.body}>
                {hasTasks &&
             <Scrollbars autoHeightMax={520} autoHide autoHeight>
                {
                    tasks.map((task) =>
                    <Card key={task.id} id={task.id} name={task.name} onRemove={(id) => {
                        removeTask(id);
                    }
                    }/>)
                }
             </Scrollbars>
                } 

                {isNewTaskInputShown &&
                <div>
                    <input className={css.input} value={inputCardName} onInput={onInputCard}/>
                </div>
                }

                {isNewTaskSelectShown &&
                <select className={css.input} onChange={(e) =>
                    setSelectedTaskId(e.target.value)}
                ><option></option>
                {getTasksByExcludedState(props.state).map((task) =>
                    <option key={task.id} value={task.id}>{task.name}</option>
                )
                }
                    </select>}
            </div>

            <div className={css.footer}>
                {(!isNewTaskInputShown && !isNewTaskSelectShown) &&
                 <button className={css.addCard} onClick={() => props.state === 'Backlog'
                   ? setIsNewTaskInputShown(true)
                   : setIsNewTaskSelectShown(true)
                   }>{buttonAddCard}</button>}

                {isNewTaskInputShown &&
                <button className={inputCardName.length === 0 ? css.addCardDis : css.submit} 
                                   disabled={inputCardName.length === 0}  onClick={() => {
                    if (props.state === 'Backlog' ) {
                        setIsNewTaskInputShown(false)
                        addTask(inputCardName);
                        setInputCardName('');
                    } else {
                        setIsNewTaskSelectShown(false);
                        moveTask(selectedTaskId, props.state);
                    }
                }}>{inputCardName.length === 0 ? buttonAddCard : "Submit"}</button>
                }

                {isNewTaskSelectShown &&
                <button className={css.submit} 
                 onClick={() => {
                    if (props.state === 'Backlog' ) {
                        setIsNewTaskInputShown(false)
                        addTask(inputCardName);
                        setInputCardName(undefined);
                    } else {
                        setIsNewTaskSelectShown(false);
                        moveTask(selectedTaskId, props.state);
                     }
                }}>Submit</button>
                }
            </div>
           
        </div>
    )
}