import { useContext } from 'react'
import { Label as LabelType, todoListCtx } from 'context/list'
import styled from 'styled-components'
import Label from './Label'

const Labels = () => {
  const { labels } = useContext(todoListCtx)

  return (
    <>
      <Row>
        <h2>Todo List</h2>
      </Row>
      <List>
        {labels.map((label: LabelType) => (
          <Label key={label._id} {...label} />
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

const List = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 3rem;
  list-style: none;
  padding: 0;
  row-gap: 4px;
`

export default Labels