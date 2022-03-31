import React, { Fragment, useState } from "react";

// List All Todos - Query
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TODOS } from "./graphql/queries";
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "./graphql/mutations";

// Create Todo - Mutation
// Update Todo - Mutation
// Delete Todo - Mutation

const App = () => {
  // hools
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [addTodo] = useMutation(ADD_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  // states and local variables
  const [userInput, setUserInput] = useState("");


  // fuctions
  const handleAddTodo = async(e) => {
    e.preventDefault();
    if(!userInput.trim()) return;

    const variables = {
      text: userInput
    }
    await addTodo({ variables, refetchQueries: [{ query: GET_TODOS }] });
    setUserInput("");
  }

  const handletoggletodo = async ({id, done}) => {
    const variables = {
      id,
      done: !done
    }
    await toggleTodo({variables})
  }

  const handledelete = async(todo) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${todo.text}?`);
    if(isConfirmed){

      const variables = {
        id:todo.id
      }

      await deleteTodo({ variables,
        update:cache => {
          const prevData = cache.readQuery({ query: GET_TODOS });
          const newData = prevData.todos.filter(t => t.id !== todo.id);
          cache.writeQuery({ query: GET_TODOS, data: { todos: newData } });
        }
      });
    }
  }




  if (loading)
    return (
      <div className="container text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container text-center my-5">
        <h1>Something went Wrong !!!</h1>
      </div>
    );



  

  


  return (
    <Fragment>
      <div className="container my-5 ">
        <div className="main">
          <h1 className="text-center my-5">GraphQL TODO</h1>
          <form onSubmit={handleAddTodo}>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Todo"
                  onChange={(e) => setUserInput(e.target.value)}
                  value={userInput}
                />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-outline-primary">
                  Add
                </button>
              </div>
            </div>
          </form>
          <div className="main-content my-5">
            <div className="mt-3">
              {data.todos.map((todo) => (
                <div key={todo.id} className="d-flex justify-content-center py-2">
                  <div className="todo-content">
                    <label className={`form-control ${todo.done && "todo-done"}`} onDoubleClick={() => handletoggletodo(todo)}>{todo.text}</label>
                  </div>
                  <button className="btn btn-outline-danger" onClick={() => handledelete(todo)}>&times;</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
