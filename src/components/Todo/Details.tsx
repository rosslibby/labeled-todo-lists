import styled from 'styled-components'
import { TodoProps } from 'components/_Todo'
import { ChangeEvent, useContext } from 'react'
import { todoListCtx } from 'context/list'

export default function Details({ _id, date, details }: TodoProps) {
  const { label, updateTodo } = useContext(todoListCtx)
  const handleChangeDetails = (e: ChangeEvent<HTMLInputElement>) =>
    updateTodo({
      _id,
      change: { details: e.target.value }
    })
  const formattedDate = date ? (new Date(date))
    .toLocaleDateString('en-US', {
      'month': 'long',
      'day': 'numeric',
      'hour': '2-digit',
      'minute': '2-digit',
    }) : null

  return (
    <Wrapper>
      {formattedDate && <TodoDate children={formattedDate} />}
      <Input
        color={label!.color}
        defaultValue={details}
        onChange={handleChangeDetails}
        placeholder="Enter details"
      />
    </Wrapper>
  )
}

const Wrapper = styled.span`
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

const Input = styled.input<{ color: string }>`
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