Node is not capable of parsing and compiling TS.
It just treats every file you execute with it as JS 

**NOTE :** 

1. Can use the `ts-node` package which simply combines the TS transpilation and node JS execution step into 1
2. However, this is not advisable for production envmt as everytime `npm start` is called, there will be that 1 overhead step of always transpiling TS to JS before actually executing the JS
3. Thus, another alternative is set up a boilerplate project that will help us transpile TS to JS as per a tsconfig.json file

### Project setup

1. Installed packages :

    `express` - to set up our API/server side code served through endpoints

    `body-parser` - package was installed to parse request body. When added as middleware, parses the data of all incoming requests and extract any JSON data it'll find in there, to populate the body key on the request object with the parsed JSON data 

    `@types/node` - to enable TS to understand and process what node/nodemon consider as keywords (eg: require, path), without whose understanding, TS can't be transpiled only into JS

    `@types/express` - express specific types

2. Routes ⇒ register and handle the routes at which API is exposed
    - Just setup your routes that extend from a particular endpoint
    - eg ⇒ endpoint = /todos so we can have the following routes :
        - Create - /todos
        - Read - /todos:id
        - Update - /todos:id
        - Delete - /todos:id
    - Then, we simply ask our running app server to use these routes if the given endpoint name (in the above eg : www.example.com**/todos**) is being hit from the client
    - setup routes

        ```jsx
        import { Router } from 'express';

        import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos';

        const router = Router();

        router.post('/', createTodo);

        router.get('/', getTodos);

        router.patch('/:id', updateTodo);

        router.delete('/:id', deleteTodo);

        export default router;
        ```

    - connect routes to main file

        ```jsx
        import express, { Request, Response, NextFunction } from 'express';
        import { json } from 'body-parser';

        import todoRoutes from './routes/todos';

        const app = express();

        app.use(json());

        app.use('/todos', todoRoutes);

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
          res.status(500).json({ message: err.message });
        });

        app.listen(3000);
        ```

3. Controllers ⇒ holds the controller functions that we want to point to from inside of our routes
    - To set up middleware functions you either gotta **specify the type** of req (Express.**Request**), res (Express.**Response**), next (Express.**NextFunction**) 
    Alternatively, just tell TS that the function handling req, res, next **is a middleware function** (function type ⇒ Express.**RequestHandler**) so we don't have to specify it for its req, res, next
    - **Typecasting** is done to enable code reader to understand what kind of object is the request
    - simple controller functions

        ```jsx
        import { RequestHandler } from 'express';

        import { Todo } from '../models/todo';

        const TODOS: Todo[] = [];

        export const createTodo: RequestHandler = (req, res, next) => {
          const text = (req.body as { text: string }).text;
          const newTodo = new Todo(Math.random().toString(), text);

          TODOS.push(newTodo);

          res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
        };

        export const getTodos: RequestHandler = (req, res, next) => {
          res.json({ todos: TODOS });
        };

        export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
          const todoId = req.params.id;

          const updatedText = (req.body as { text: string }).text;

          const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

          if (todoIndex < 0) {
            throw new Error('Could not find todo!');
          }

          TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

          res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
        };

        export const deleteTodo: RequestHandler = (req, res, next) => {
          const todoId = req.params.id;

          const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

          if (todoIndex < 0) {
            throw new Error('Could not find todo!');
          }

          TODOS.splice(todoIndex, 1);

          res.json({ message: 'Todo deleted!' });
        };
        ```

4. Models ⇒ Contains the skeleton of objects, classes etc. being used in our API server
- eg : a todo object

    ```jsx
    export class Todo {
      constructor(public id: string, public text: string) {}
    }
    ```

### Nest JS

1. Node JS framework which embraces TS out of the  box
2. Build Node web apps, REST APIs, apps that render views, GraphQL APIs with Node and TS

[NestJS - A progressive Node.js framework](https://nestjs.com/)
