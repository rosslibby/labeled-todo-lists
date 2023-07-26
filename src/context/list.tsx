import { ReactNode, createContext, useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'

export type EditTodo = {
  _id: string
  change: {
    [key: string]: any
  }
}

export interface TodoItem {
  name: string
  details?: string
  date?: number
}

export interface Todo extends TodoItem {
  _id: string
  labelID: string
  completed: boolean
}

export type LabelTodo = {
  _id: string
  completed: boolean
}

export type Label = {
  _id: string
  color: string
  name: string
  todos: LabelTodo[]
  selected: boolean
}

export type TodoListContext = {
  labels: Label[]
  todos: Todo[]
  addItem: (details: TodoItem, labelId: string) => void
  addLabel: (name: string, color: string) => void
  label: Label | null
  selectLabel: (_id?: string) => void
  toggleCompleteItem: (_id: string) => void
  updateTodo: ({ _id, change }: EditTodo) => void
  editTodo: (todo: Todo) => void
  editLabel: (_id: string) => void
  removeTodo: (_id: string) => void
}

const initialLabelIDs: string[] = [uuid(), uuid(), uuid()]

const initialTodos: Todo[] = [
  {
    _id: uuid(),
    name: 'Home',
    labelID: initialLabelIDs[0],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Today',
    labelID: initialLabelIDs[1],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Personal',
    labelID: initialLabelIDs[2],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Work',
    labelID: initialLabelIDs[0],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Errands',
    labelID: initialLabelIDs[1],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'House',
    labelID: initialLabelIDs[2],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Road trip list',
    labelID: initialLabelIDs[0],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Complete',
    labelID: initialLabelIDs[1],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Home',
    labelID: initialLabelIDs[0],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Today',
    labelID: initialLabelIDs[1],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Personal',
    labelID: initialLabelIDs[2],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Work',
    labelID: initialLabelIDs[0],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Errands',
    labelID: initialLabelIDs[1],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'House',
    labelID: initialLabelIDs[2],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Road trip list',
    labelID: initialLabelIDs[0],
    completed: false,
  },
  {
    _id: uuid(),
    name: 'Complete',
    labelID: initialLabelIDs[1],
    completed: false,
  },
]

const initialLabels: Label[] = [
  {
    _id: initialLabelIDs[0],
    color: 'red',
    name: 'Home',
    todos: initialTodos.filter((todo: Todo) => todo.labelID === initialLabelIDs[0]).map((todo: Todo) => ({ _id: todo._id, completed: todo.completed })),
    selected: false,
  },
  {
    _id: initialLabelIDs[1],
    color: 'purple',
    name: 'Today',
    todos: initialTodos.filter((todo: Todo) => todo.labelID === initialLabelIDs[1]).map((todo: Todo) => ({ _id: todo._id, completed: todo.completed })),
    selected: false,
  },
  {
    _id: initialLabelIDs[2],
    color: 'green',
    name: 'Personal',
    todos: initialTodos.filter((todo: Todo) => todo.labelID === initialLabelIDs[2]).map((todo: Todo) => ({ _id: todo._id, completed: todo.completed })),
    selected: false,
  },
]

const initialContext: TodoListContext = {
  labels: initialLabels,
  todos: initialTodos,
  addItem: (details: TodoItem, labelId: string) => null,
  addLabel: (name: string, color: string) => null,
  label: null,
  selectLabel: (_id?: string) => null,
  toggleCompleteItem: (_id: string) => null,
  updateTodo: ({ _id, change }: EditTodo) => null,
  editTodo: (todo: Todo) => null,
  editLabel: (_id: string) => null,
  removeTodo: (_id: string) => null,
}

export const todoListCtx = createContext<TodoListContext>(initialContext)

type TodoListProviderProps = {
  children: ReactNode
}

export const TodoListProvider = ({ children }: TodoListProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [labels, setLabels] = useState<Label[]>(initialLabels)
  const updateTodo = useCallback(({ _id, change }: EditTodo) => {
    setTodos((prevState: Todo[]) => prevState.map(
      (todo: Todo) => todo._id === _id
        ? ({ ...todo, ...change })
        : todo
    ))
  }, [setTodos])
  const selectLabel = useCallback((_id?: string) => setLabels(
    (prevState: Label[]) => prevState.map((label: Label) => ({
      ...label,
      selected: label._id === _id,
    }))
  ), [setLabels])
  const label = labels.find((label: Label) => label.selected) || null
  const removeTodo = useCallback((_id: string) => {
    setTodos((prevState: Todo[]) => prevState.filter(
      (todo: Todo) => todo._id !== _id
    ))
    setLabels((prevState: Label[]) => prevState.map(
      (label: Label) => ({
        ...label,
        todos: label.todos.filter((todo: LabelTodo) => todo._id !== _id),
      })
    ))
  }, [setLabels, setTodos])
  const addItem = useCallback((details: TodoItem, labelId: string) => {
    const todoId = uuid()
    const newTodo: Todo = {
      ...details,
      _id: todoId,
      labelID: labelId,
      completed: false,
    }

    setTodos((prevState: Todo[]) => [...prevState, newTodo])

    setLabels((prevState: Label[]) => prevState.map(
      (label: Label) => ({
        ...label,
        todos: label._id === labelId ? [...label.todos, { _id: todoId, completed: false }] : label.todos,
      })
    ))
  }, [setLabels, setTodos])
  const addLabel = useCallback((name: string, color: string) => {
    const labelId = uuid()

    // add color to css variables
    document.body.style.setProperty(`--color--user-def-${color.substring(1, color.length)}`, color)

    setLabels((prevState: Label[]) => [
      ...prevState,
      {
        _id:
        labelId,
        name,
        todos: [],
        color: `user-def-${color.substring(1, color.length)}`,
        selected: false,
      },
    ])
  }, [setLabels])
  const toggleCompleteItem = useCallback((_id: string) => {
    setTodos((prevState: Todo[]) => prevState.map(
      (todo: Todo) => ({
        ...todo,
        completed: todo._id === _id ? !todo.completed : todo.completed,
      })
    ))
    setLabels((prevState: Label[]) => prevState.map(
      (label: Label) => ({
        ...label,
        todos: label.todos.map((todo: LabelTodo) => todo._id === _id ? ({ ...todo, completed: !todo.completed }) : todo)
      })
    ))
  }, [setTodos])
  const editTodo = useCallback((details: Todo) => {
    setTodos((prevState: Todo[]) => prevState.map(
      (todo: Todo) => todo._id === details._id ? { ...todo, ...details } : todo,
    ))
  }, [setTodos])
  const editLabel = useCallback(() => {}, [])

  return (
    <todoListCtx.Provider value={{
      label,
      labels,
      todos,
      addItem,
      addLabel,
      editLabel,
      updateTodo,
      editTodo,
      removeTodo,
      selectLabel,
      toggleCompleteItem,
    }}>
      {children}
    </todoListCtx.Provider>
  )
}