import { todoListCtx } from 'context/list'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import styled from 'styled-components'

const AddTodo = () => {
  const { addItem, label } = useContext(todoListCtx)
  const [name, setName] = useState<string>('')
  const [details, setDetails] = useState<string>('')
  const [date, setDate] = useState<number>((new Date()).getTime())
  const changeName = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value), [setName])
  const changeDate = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setDate((new Date(e.target.value).getTime())), [setDate])
  const changeDetails = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setDetails(e.target.value), [setDetails])
  const createTodo = useCallback(() => {
    addItem({ name, date, details }, label!._id)
    setName('')
    setDetails('')
  }, [addItem, date, details, label, name, setDetails, setName])

  return (
    <Wrapper>
      <Title>Create a new todo in "{label!.name}"</Title>
      <InputWrapper>
        <Input
          onChange={changeName}
          placeholder="Name"
          value={name}
          type="text"
        />
        <Calendar type="datetime-local" onChange={changeDate} />
      </InputWrapper>
      <Input
          onChange={changeDetails}
          placeholder="Details"
          value={details}
          type="text"
        />
        <Button onClick={createTodo}>
          Add todo
        </Button>
    </Wrapper>
  )
}

const Title = styled.span`
  color: #89929c;
  font-size: 13px;
  margin-bottom: 1rem;
  text-align: center;
`

const Wrapper = styled.div`
  border-top: 1px solid #eff0f1;
  display: grid;
  grid-template-rows: auto auto auto;
  padding-top: 1rem;
  row-gap: 12px;
`

const InputWrapper = styled.div`
  column-gap: 8px;
  display: grid;
  grid-auto-flow: column;
`

const Input = styled.input`
  background-color: #eff0f175;
  border: 1px solid #e2e2e29c;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  width: 100%;
`

const Calendar = styled(Input)`
  color: #757575;
  font-family: inherit;
`

const Button = styled.button`
  background-color: #0e6dff;
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 14px 16px;
`

export default AddTodo