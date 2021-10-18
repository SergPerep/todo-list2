import React, { useState, useContext } from "react";
import ChooseProject from "./ChoosePoject";
import { TasklistContext } from "./TasklistContext";


const InputTask = () => {
    // Grab function out of «value» of context
    const {getTasks} = useContext(TasklistContext);
    const [value, setValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {description: value};
        try {
            const newTask = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            const message = await newTask.json();
            console.log(message);
            getTasks();
            setValue("");
        } catch (error) {
            console.error(error.message);
        }
        
    }

    return (
        <form className="taskinput" onSubmit={handleSubmit}>
            <input type="text" placeholder="+ Add task" value={value} onChange={e => setValue(e.target.value)}/>
            <div className="taskinput-options">
                <ChooseProject></ChooseProject>
                <ChooseProject></ChooseProject>
            </div>
        </form>
    )
}

export default InputTask;