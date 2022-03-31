import { gql } from "apollo-boost"; 

// toggle status of the todo
export const TOGGLE_TODO = gql `
    mutation toggleTodo($id:uuid!, $done:Boolean!) {
        update_todos(where: {id: {_eq: $id}}, _set: {done: $done}) {
            returning {
            done
            id
            text
            }
        }
    }
`

// add a new todo
export const ADD_TODO = gql `
    mutation addTodo($text:String!) {
        insert_todos(objects: {text: $text}) {
            returning {
                id
                text
                done
            }
        }
    }
`

// delete a todo
export const DELETE_TODO = gql `
    mutation deleteTodo($id: uuid!) {
        delete_todos(where: {id: {_eq: $id}}) {
            returning {
            id
            text
            done
            }
        }
    }
`