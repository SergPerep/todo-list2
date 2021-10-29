import React, { useState, useContext } from "react";
import Checkbox from "./Checkbox";
import date from "date-and-time";
import { TasklistContext } from "./TasklistContext";
import { useClickOutside } from "./CustomHooks";

const TaskItem = props => {
    const { id, description, status_of_completion, date_and_time, read_time, folder } = props.data;
    const { getTasks } = useContext(TasklistContext);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    
    // Handles click outside of «more»
    const more = useClickOutside(()=>{
        setMenuIsOpen(false);
    });

    // Handles click on «more»
    const handleClickMore = () => {
        setMenuIsOpen(!menuIsOpen);
    }

    const updateStatus = async () => {
        try {
            const body = { status_of_completion: !status_of_completion };
            const updateCheckStatus = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const response = await updateCheckStatus.json();
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }



    const deleteTask = async () => {
        try {
            const delTask = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "DELETE"
            });
            const message = await delTask.json();
            console.log(message);
            getTasks();
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleDeleteClick = () => {
        deleteTask();
    }

    return (
        <div className="taskitem">
            <Checkbox status={status_of_completion} updateStatus={updateStatus} />
            <div className="taskitem-content-wrapper">
                <div className="taskitem-desc">{description}</div>
                <div className="taskitem-details">
                    {date_and_time && <span className="taskitem-date">
                        {date.format(date_and_time, "MMM DD")}
                    </span>}
                    {read_time && <span className="taskitem-time">
                        {/*date.format(date_and_time, "hh:mm [GMT]Z")*/}
                        {date_and_time.toISOString()}
                    </span>}
                    {folder && <span className="taskitem-folder">{folder}</span>}
                </div>
            </div>
            <div className="more" onClick={handleClickMore} ref={more}>
                <div className="icon-more">
                    <div className="circle"></div>
                </div>
                {menuIsOpen && <ul className="context-menu pos-right">
                    <li>Edit</li>
                    <li onClick={handleDeleteClick}>Delete</li>
                </ul>}

            </div>

        </div>
    )
}

export default TaskItem;