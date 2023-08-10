import { useContext } from 'react'
import styled from 'styled-components'
import Labels from './Labels'
import Todos from './Todos'
import { todoListCtx } from 'context/list'
import AddLabel from './AddLabel'
import AddTodo from './AddTodo'

const Body = () => {
  const { label } = useContext(todoListCtx)

  return (
    <Wrapper>
      <StyledBody>
        {!label && <Labels />}
        {label && <Todos />}
        {!label && <AddLabel />}
        {label && <AddTodo />}
      </StyledBody>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  background-color: #b395ff;
  display: grid;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const StyledBody = styled.main`
  background-color: var(--bg--primary);
  border-radius: 12px;
  box-shadow: 0 0 80px 11px #c6c6c652;
  box-sizing: border-box;
  color: var(--text--primary);
  display: grid;
  grid-template-rows: 1.5fr 13fr auto;
  min-height: 560px;
  padding: 2.5rem;
  width: 400px;
`

export default Body
