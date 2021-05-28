```tsx
npx create-react-app project-name --typescript
```

### Components

1. FC ⇒ **FunctionComponent**, provided out of the box, by react
CC ⇒ **ClassicComponent**, provided by react
2. TS helps by giving error in case we assign this to a function/class but forget to write the **return** statement
- Code eg

    ```tsx
    const App: React.FC = () => {
      const [todos, setTodos] = useState<Todo[]>([]);

      const todoAddHandler = (text: string) => {
        setTodos(prevTodos => [
          ...prevTodos,
          { id: Math.random().toString(), text: text }
        ]);
      };

      const todoDeleteHandler = (todoId: string) => {
        setTodos(prevTodos => {
          return prevTodos.filter(todo => todo.id !== todoId);
        });
      };

      return (
        <div className="App">
          <NewTodo onAddTodo={todoAddHandler} />
          <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
        </div>
      );
    };

    export default App;
    ```

### Props

1. While using React with TS, you have to be **clear with the types** you're working with
2.  You gotta specify the **structure of the prop** that you're passing between components
3. We can do this by saying that the FC/ CC type is actually a generic type, where we can define all extra props beside the **default prop** - children, which every component has, which we expect.
4. Can use an **interface** to make our code leaner
5. When passing around a **function as a prop**, in the type definition of prop (usually stored in an interface) by receiving component, just mention the skeleton of the function eg : onTodoDelete = (id : string) ⇒ void
- Code eg

    ```tsx
    interface TodoListProps {
      items: { id: string; text: string }[];
      onDeleteTodo: (id: string) => void;
    }

    const TodoList: React.FC<TodoListProps> = props => {
      return (
        <ul>
          {props.items.map(todo => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={props.onDeleteTodo.bind(null, todo.id)}>
                DELETE
              </button>
            </li>
          ))}
        </ul>
      );
    };

    export default TodoList;
    ```

- Code eg 2

    ```tsx
    type NewTodoProps = {
      onAddTodo: (todoText: string) => void;
    };

    const NewTodo: React.FC<NewTodoProps> = props => {
      const textInputRef = useRef<HTMLInputElement>(null);

      const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAddTodo(enteredText);
      };

      return (
        <form onSubmit={todoSubmitHandler}>
          <div className="form-control">
            <label htmlFor="todo-text">Todo Text</label>
            <input type="text" id="todo-text" ref={textInputRef} />
          </div>
          <button type="submit">ADD TODO</button>
        </form>
      );
    };

    export default NewTodo;
    ```

### User input with "refs"

1. Need to specify the **type of event** (reactive event), at which you wish to fire some function to change the state. eg : React.FormEvent
2. Need to specify the **type of ref** you are going to be extracting from the useRef. eg : useRef<HTMLInputElement>(null) if you're using this ref on an input type element
3. Need to specify the fact that the state should only be updated if the value inside the current object inside the ref is non null. 
We do this **nullish coalescing** using the " ! " operator
- Code eg

    ```tsx
    type NewTodoProps = {
      onAddTodo: (todoText: string) => void;
    };

    const NewTodo: React.FC<NewTodoProps> = props => {
      const textInputRef = useRef<HTMLInputElement>(null);

      const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAddTodo(enteredText);
      };

      return (
        <form onSubmit={todoSubmitHandler}>
          <div className="form-control">
            <label htmlFor="todo-text">Todo Text</label>
            <input type="text" id="todo-text" ref={textInputRef} />
          </div>
          <button type="submit">ADD TODO</button>
        </form>
      );
    };

    export default NewTodo;
    ```

4. **Baseline** ⇒ Always set a type definition on the props you are gonna be importing into the component

### Cross component communication

1. Simple throwing-receiving of props across components in React
2. We simply just need to tell the prop-receiving-component about the type of prop it is receiving using a **type** or an **interface** and mounting it as a **generic type** onto our component 
- Code eg  : Passing the method **onAddTodo** as a prop

    ```tsx
    const App: React.FC = () => {
      const [todos, setTodos] = useState<Todo[]>([]);

      const todoAddHandler = (text: string) => {
        setTodos(prevTodos => [
          ...prevTodos,
          { id: Math.random().toString(), text: text }
        ]);
      };

      const todoDeleteHandler = (todoId: string) => {
        setTodos(prevTodos => {
          return prevTodos.filter(todo => todo.id !== todoId);
        });
      };

      return (
        <div className="App">
          <NewTodo onAddTodo={todoAddHandler} />
          <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
        </div>
      );
    };

    export default App;
    ```

### Working with State and Types

1. Initialize state returned from useState properly with types to tell React how our state will look over time
If we initialize it to be just an empty array, we can't add objects to this array using the setter as TS doesn't know what kind of variable do we wish to store as our state
2. useState is a **generic function** because we can pass into it, the structure of our state
    - Code eg : our state is an array of objects having an id and some text

        ```tsx
        const App: React.FC = () => {
          const [todos, setTodos] = useState<Todo[]>([]);

          const todoAddHandler = (text: string) => {
            setTodos(prevTodos => [
              ...prevTodos,
              { id: Math.random().toString(), text: text }
            ]);
          };

          const todoDeleteHandler = (todoId: string) => {
            setTodos(prevTodos => {
              return prevTodos.filter(todo => todo.id !== todoId);
            });
          };

          return (
            <div className="App">
              <NewTodo onAddTodo={todoAddHandler} />
              <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
            </div>
          );
        };

        export default App;
        ```

3. If our state is a **collection of items** ⇒ we can even choose abstract away the **structure** of say each element using an **interface** in a separate file 
4. **Scheduling state updates**  - React actually schedules state updates. So, if we just put state updation as `setTodos([...todos, {id:lastId + 1, text:e.target.value}])` it may actually happen that setTodos ends up using a non-latest version of **todos** while updating state thus, corrupting the state with stale data
Instead we call a function that references the latest value of todos and only adds a new todo to this updated list ⇒ `setTodos(prevTodos => [...prevTodos, {id:lastId + 1, text:e.target.value}] )` 

### General Pointers

1. Just hover over any hook you wish to use to understand which types it is working with.
2. [React redux](https://redux.js.org/recipes/usage-with-typescript)
3. In packages where TS is not natively, specially supported, we can try some mods during installation by prepending **@types/**  to the packagename

    ```bash
    npm i --save-dev @types/react-router-dom
    ```

    Get good autocompletion and some type checking support at the very least
