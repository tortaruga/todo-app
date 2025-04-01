import TodoElement from "./components/TodoElement.jsx";
import Blabberings from "./components/Blabberings.jsx";

import { useEffect, useRef, useState } from "react";
import { saveList, getList } from './indexedDbUtils.js';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [list, setList] = useState([]);
  const todoInputRef = useRef(null);
  
  // save data to database every time a change to list happens
  useEffect(() => {
    saveList(list);
  }, [list]);

  // load list from database on refresh or window open
  useEffect(() => {
    const loadData = async () => {
        const savedList = await getList();
        if (savedList) {
          const sortedList = savedList.sort((a, b) => (a.createdAt - b.createdAt))
            setList(sortedList);
        }
    };
    loadData();
}, []); 

  
  function createNote(e) {
    e.preventDefault();
     
    const todoId = uuidv4();
    const todoText = todoInputRef.current.value;

    setList(prevList => {
      return [... prevList, {id: todoId, text: todoText, isCompleted: false, createdAt: Date.now()}]
    })

    todoInputRef.current.value = '';
  }

  const updateItem = (id, newText) => {
    const updatedList = list.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
    );
    setList(updatedList);
};

  const todoElements = list.map(todo => { 
    return (
      <TodoElement key={todo.id} id={todo.id} text={todo.text} isCompleted={todo.isCompleted} list={list} setList={setList} updateItem={updateItem}/> 
    )
  })

  return (
    <>
      <main>

        <div className="todo-app">
          <h1>to<span>do</span> list</h1>

          <form className="create-task-form" onSubmit={createNote}>
            <input placeholder="enter task" type="text" name="todo-input" id="todo-input" ref={todoInputRef}/>
            <button>create task</button>
           </form>
        
          <div className="list">
            {list.length === 0 && <p className="empty-list">your tasks will appear here</p>} 
            {todoElements}
          </div>
        </div>

        <Blabberings />
        
      </main>
    </>
  )
}

export default App
