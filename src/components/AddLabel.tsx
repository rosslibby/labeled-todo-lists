import { todoListCtx } from 'context/list'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import styled from 'styled-components'

const AddLabel = () => {
  const { addLabel } = useContext(todoListCtx)
  const [name, setName] = useState<string>('')
  const [color, setColor] = useState<string>('#ff0066')
  const changeName = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value), [setName])
  const changeColor = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setColor(e.target.value),
  [setColor])
  const createLabel = useCallback(() => {
    addLabel(name, color)
    setName('')
  }, [addLabel, color, name, setName])

  return (
    <Wrapper>
      <Title>Add a label</Title>
      <InputWrapper>
        <Color
          onChange={changeColor}
          type="color"
          value={color}
        />
        <Input
          onChange={changeName}
          placeholder="Name"
          value={name}
          type="text"
        />
        <Button onClick={createLabel}>
          <i className="fas fa-plus" />
        </Button>
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-top: 1px solid #eff0f1;
  display: grid;
  grid-template-rows: auto auto;
  padding-top: 1rem;
  row-gap: 12px;
`

const Title = styled.span`
  color: #89929c;
  font-size: 13px;
  margin-bottom: 1rem;
  text-align: center;
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Color = styled.input<{ value: string }>`
  aspect-ratio: 1;
  background-color: ${({ value }) => value};
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  height: 2rem;
  width: 2rem;

  &::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
  }
`

const Input = styled.input`
  background-color: #eff0f175;
  border: 1px solid #e2e2e29c;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  margin: 0 8px;
  width: 100%;
`

const Button = styled.button`
  background-color: #0e6dff;
  border: none;
  border-radius: 30px;
  color: #ffffff;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 12px;
`

export default AddLabel