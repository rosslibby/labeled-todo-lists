import { useContext } from 'react'
import styled from 'styled-components'
import { Icon as BaseIcon } from '../Icon'
import { todoListCtx } from 'context/list'
import { TodoProps } from 'components/_Todo'

const BasicInfo = ({ _id, completed, name, select }: TodoProps) => {
  const {
    label,
    removeTodo,
    toggleCompleteItem,
  } = useContext(todoListCtx)

  return (
    <Wrapper>
      <Icon
        color={label!.color}
        $completed={completed}
        onClick={() => toggleCompleteItem(_id)}
      />
      <Name
        $completed={completed}
        onClick={() => select(_id)}
      >{name}</Name>
      <Delete onClick={() => removeTodo(_id)}>
        <i className="fas fa-close" />
      </Delete>
    </Wrapper>
  )
}


const Wrapper = styled.span`
  align-items: center;
  column-gap: 16px;
  display: grid;
  grid-template-columns: 2fr 33fr 5fr;
`

const Icon = styled(BaseIcon)`
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

const Name = styled.span<{ $completed: boolean }>`
  padding: 14px 0;
  ${({ $completed }) => $completed ? 'text-decoration: line-through;' : ''}
`

const Delete = styled.button`
  background-color: transparent;
  border: none;
  transform: translateX(50%);

  &:hover {
    color: #ff0057;
    cursor: pointer;
  }
`

export default BasicInfo