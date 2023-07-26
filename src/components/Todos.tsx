import { useCallback, useContext, useState } from 'react'
import { Todo as TodoType, todoListCtx } from 'context/list'
import styled from 'styled-components'
import Todo from './Todo'

const Todos = () => {
  const { label, selectLabel, todos } = useContext(todoListCtx)
  const [selected, setSelected] = useState<string | null>(null)
  const handleSelectTodo = useCallback((_id?: string) => setSelected(_id || null), [setSelected])
  const labelTodos = todos.filter(
    (todo: TodoType) => todo.labelID === label!._id
  )

  const handleBackClick = useCallback(() => selectLabel(), [selectLabel])

  return (
    <>
      <Row>
        <BackButton onClick={handleBackClick}>
          <i className="fas fa-arrow-left" />
        </BackButton>
        <h2>{label!.name}</h2>
      </Row>
      <List>
        {labelTodos.map((todo: TodoType) => (
          <Todo
            key={todo._id}
            select={handleSelectTodo}
            selected={selected === todo._id}
            {...todo}
          />
        ))}
      </List>
    </>
  )
}

const Row = styled.div`
  display: flex;

  h2 {
    margin: auto 0;
  }
`

const BackButton = styled.button`
  background-color: var(--color--gray-1);
  border: none;
  border-radius: 8px;
  color: var(--color--gray-2);
  cursor: pointer;
  margin: 0 14px;
  padding: 8px 12px;
`

const List = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  list-style: none;
  padding: 0;
  row-gap: 8px;
`

export default Todos