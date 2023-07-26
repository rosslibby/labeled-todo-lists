import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { Todo as TodoType, todoListCtx } from 'context/list'
import styled from 'styled-components'

interface TodoProps extends TodoType {
  select: (_id?: string) => void
  selected: boolean
}

const Todo = ({
  _id,
  date,
  details,
  name,
  completed,
  select,
  selected,
}: TodoProps) => {
  const {
    label,
    removeTodo,
    toggleCompleteItem,
    updateTodo,
  } = useContext(todoListCtx)
  const [showActions, setShowActions] = useState<boolean>(false)
  const toggleComplete = useCallback(() => toggleCompleteItem(_id), [_id, toggleCompleteItem])
  const toggleShowActions = useCallback(() => setShowActions((prevState: boolean) => !prevState), [setShowActions])

  const handleChangeDetails = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    updateTodo({
      _id,
      change: { details: e.target.value },
    }),
  [_id, updateTodo])

  const formattedDate = date ? (new Date(date))
    .toLocaleDateString('en-US', {
      'month': 'long',
      'day': 'numeric',
      'hour': '2-digit',
      'minute': '2-digit',
    }) : null

  return (
    <StyledTodo $selected={selected}>
      <BasicInfo>
        <Icon
          color={label!.color}
          $completed={completed}
          onClick={toggleComplete}
        >
          {completed && <i className="fas fa-check" />}
        </Icon>
        <TodoName
          $completed={completed}
          onClick={() => select(_id)}
        >{name}</TodoName>
        <DeleteButton onClick={() => removeTodo(_id)}><i className="fas fa-close" /></DeleteButton>
      </BasicInfo>
      {selected && (
        <Details>
          {formattedDate && <TodoDate>{formattedDate}</TodoDate>}
          <DetailsInput
            color={label!.color}
            defaultValue={details}
            onChange={handleChangeDetails}
            placeholder="Enter details"
          />
        </Details>
      )}
    </StyledTodo>
  )
}

const StyledTodo = styled.li<{ $selected: boolean }>`
  align-items: center;
  background-color: ${({ $selected }) => $selected ? '#f3f4f69c' : 'transparent'};
  border-radius: 8px;
  box-sizing: border-box;
  row-gap: 8px;
  display: grid;
  font-size: 16px;
  font-weight: 500;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  overflow: hidden;
  padding: 0 18px;
  position: relative;
  transition: all .35s ease;
  width: 100%;

  &:hover {
    background-color: #f3f4f69c;
    cursor: pointer;
  }
`

const BasicInfo = styled.span`
  align-items: center;
  column-gap: 16px;
  display: grid;
  grid-template-columns: 2fr 33fr 5fr;
`

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  transform: translateX(50%);

  &:hover {
    color: #ff0057;
    cursor: pointer;
  }
`

const Details = styled.span`
  align-items: flex-start;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  padding-bottom: 18px;
  row-gap: 8px;
`

const TodoDate = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  text-transform: uppercase;
`

const DetailsInput = styled.input<{ color: string }>`
  font-size: 15px;
  font-weight: 300;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding-bottom: 3px;
  padding: 4px 8px;
  border-left: 1px solid ${({ color }) => `var(--color--${color})`};

  &:hover {
    background-color: var(--color--gray-1);
  }

  &:focus {
    background-color: var(--color--gray-1);
    outline: none;
  }
`

const Icon = styled.button<{ color: string, $completed: boolean }>`
  aspect-ratio: 1;
  background-color: ${({ $completed, color }) => $completed ? `var(--color--${color})` : 'transparent'};
  border: 2px solid var(--color--${({ color }) => color});
  border-radius: 4px;
  height: 13px;
  padding: 0;
  width: 13px;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  color: white;
  transition: all .15s ease;

  &:hover {
    background-color: ${({ color }) => `var(--color--${color})`};
    cursor: pointer;
  }
`

const TodoName = styled.span<{ $completed: boolean }>`
  padding: 14px 0;
  ${({ $completed }) => $completed ? 'text-decoration: line-through;' : ''}
`

export default Todo