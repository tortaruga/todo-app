import { deleteTask } from '../indexedDbUtils.js';
import { useState } from "react";

export default function TodoElement(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.text);

    function toggleTodo(id) {
        const updatedList = props.list.map(todo => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
    
        props.setList(updatedList);
    }
    
    async function deleteTodo(id) {
        // delete task from database
        await deleteTask(id);

        // delete task from list
        const updatedList = props.list.filter(todo => todo.id !== id);
        props.setList(updatedList);
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleTextChange(e) {
        const {value} = e.target;
        setEditedText(value);
    }

    function saveTodo(e)  {
        e.preventDefault();

        props.updateItem(props.id, editedText);
        setIsEditing(false);
    }

    return (
        <div className="todo-item">  
          <form className='task-form' onSubmit={saveTodo}>
            <label htmlFor={props.id}>
                <div className="group-1">
                  <input type="checkbox" name={props.id} id={props.id} checked={props.isCompleted} onChange={() => toggleTodo(props.id)} />
                  {isEditing ? (
                    <input className='editing-input' type="text" name="{`editing-${props.id}`}" value={editedText} id={`editing-${props.id}`} onChange={handleTextChange} />
                  ) : ( 
                    <p className={props.isCompleted ? 'completed todo-text' : 'todo-text'}>{props.text}</p>
                  )}
                </div>

                <div className="group-2">
                  <button className='delete-btn' type='button' aria-label='delete task' onClick={() => deleteTodo(props.id)}></button>
        
                  {isEditing ? (
                    <button className='save-btn' type='button' onClick={saveTodo}>save</button>
                  ) : ( 
                    <button className='edit-btn' aria-label='edit task' type='button' onClick={handleEdit}></button>
                  )}
                </div>
              </label> 
            </form>
        </div>
    )
}