import { useEffect, useState } from "react";
import EnteredToDos from "./EnteredToDos.jsx";
import Button from "./Button.jsx";

function ToDoApp() {
  const [arrayOfToDos, setArrayOfToDos] = useState([]);
  const [toDoInput, setToDoInput] = useState("");
  const [initialMount, setInitialMount] = useState(true);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //Get user input Value Func
  const getUserInput = (event) => {
    setErrorMessage("");
    const { value } = event.target;

    setToDoInput(value);
  };

  //Form submission Func
  const handleFormSubmission = (event) => {
    event.preventDefault();

    if (toDoInput.trim()) {
      if (editingIndex !== null) {
        setArrayOfToDos((prevData) => {
          const newArrayOfToDos = [...prevData];
          newArrayOfToDos[editingIndex] = toDoInput;
          return newArrayOfToDos;
        });
        setEditingIndex(null);
      } else {
        setArrayOfToDos((prevData) => [...prevData, toDoInput]);
      }
      setToDoInput("");
    } else {
      setErrorMessage("Please enter a todo Item");
    }
  };

  // Get and load To-Dos from local storage
  useEffect(() => {
    const storedToDos = localStorage.getItem("ArrayOfToDos");

    if (storedToDos) {
      setArrayOfToDos(JSON.parse(storedToDos));
    }

    setInitialMount(false);
  }, []);

  //Save To-Dos to localstorage
  useEffect(() => {
    if (!initialMount) {
      localStorage.setItem("ArrayOfToDos", JSON.stringify(arrayOfToDos));
    }
  }, [arrayOfToDos, initialMount]);

  // Edit To-Do Function
  const handleTodoEdit = (index) => {
    setToDoInput(arrayOfToDos[index]);
    setEditingIndex(index);
  };

  // Toggle Dropdown Func
  const toggleDropdown = (index) => {
    setActiveDropdownIndex((currentState) => (currentState === index ? null : index));
  };

  // Delete To-Do Manager
  const handleDelete = (index) => {
    setArrayOfToDos((prevData) => {
      const newArray = prevData.filter((_, ind) => ind !== index);
      return newArray;
    });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmission}>
        <div className="input-group">
          <label htmlFor="todo">Enter To-Do</label>
          <input
            type="text"
            name="todo"
            id="todo"
            value={toDoInput || ""}
            onChange={getUserInput}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="add-todo-cancel-btn">
          <Button
            buttonType={"submit"}
            buttonText={editingIndex !== null ? "Update Todo" : "Add Todo"}
            className={"button"}
          />
          {editingIndex !== null && (
            <Button
              buttonType={"button"}
              buttonText={"Cancel"}
              className={"cancel-button"}
              onBtnClick={() => {
                setEditingIndex(null);
                setToDoInput("");
              }}
            />
          )}
        </div>
      </form>

      {/* Render Data */}

      {arrayOfToDos.length > 0 && (
        <div className="entered-todos-container">
          <ul className="todo-list-container">
            {arrayOfToDos.map((todoItem, index) => (
              <li key={index}>
                <EnteredToDos
                  todoIndex={index}
                  title={todoItem}
                  onEditClick={() => handleTodoEdit(index)}
                  onDeleteClick={() => handleDelete(index)}
                  isDropdownOpen={activeDropdownIndex === index}
                  toggleDropdown={() => toggleDropdown(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ToDoApp;
