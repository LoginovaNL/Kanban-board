import { TaskContext } from "./task-context";
import { useEffect, useState } from "react";

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [idCounter, setIdCounter] = useState(0);

    const [states] = useState([
        {id: 1, name: 'Backlog', state: 'Backlog'},
        {id: 2, name: 'Ready', state: 'Ready'},
        {id: 3, name: 'In Progress', state: 'InProgress'},
        {id: 4, name: 'Finished', state: 'Finished'}
    ]);

    const findById = (id) => tasks.find((task) => task.id === parseInt(id));

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }, [tasks, isLoaded])

    useEffect(() => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            setTasks(JSON.parse(tasks))
        }
        setIsLoaded(true);
    }, [])

    const context = {
        states,
        addTask: (name) => {
            const id = idCounter + 1;
            const task = {
                id,
                name,
                state: 'Backlog'
            }

            setIdCounter(id);
            setTasks([...tasks, task])
        },
        updateTask: (item) => {
            const task = findById(item.id);
            task.name = item.name;
            task.description = item.description;
            setTasks([...tasks]);
        },
        removeTask: (id) => {
            const task = findById(id);
            if (task) {
                setTasks([...tasks.filter(item => item.id !== task.id)])
            }
        },
        getTaskById: findById,

        getTasksByState: (state) => {
            switch(state) {
                case 'Backlog':
                    return tasks.filter(task => task.state === 'Backlog');
                case 'Ready':
                    return tasks.filter(task => task.state === 'Ready');
                case 'InProgress':
                    return tasks.filter(task => task.state === 'InProgress');
                case 'Finished':
                    return tasks.filter(task => task.state === 'Finished');
                default:
                    return [];                 
            }
        },
       
        getTasksByExcludedState: (state) => {
            
            switch (state) {
                case 'Ready':
                    return tasks.filter(task => task.state === 'Backlog');
         
                case 'InProgress':
                   return  tasks.filter(task => task.state === 'Ready');
                   
                case 'Finished': 
                     return tasks.filter(task => task.state === 'InProgress');
                   
                default:
                    return;   
            } 
        },
        
    moveTask: (id, state) => {
        const task = findById(id);
        if (task) {
            task.state = state;
        }
        setTasks([...tasks]);
    },
    getActiveTaskCount: () =>
            tasks.filter(task => task.state === 'Ready' || task.state === 'InProgress').length,
        
        getFinishedTaskCount: () =>
            tasks.filter(task => task.state === 'Finished').length,
    };

    return <TaskContext.Provider value={context}>{isLoaded && props.children}</TaskContext.Provider>
};