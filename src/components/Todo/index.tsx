import styled from 'styled-components'
import { TodoProps } from 'components/_Todo'
import BasicInfo from './BasicInfo'

export default function Todo(props: TodoProps) {
    return (
      <StyledTodo $selected={props.selected}>
        <BasicInfo {...props} />
        {props.selected && <Details />}
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

const Details = styled.span`
  align-items: flex-start;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  padding-bottom: 18px;
  row-gap: 8px;
`