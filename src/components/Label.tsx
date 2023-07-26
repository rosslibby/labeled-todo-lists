import { useCallback, useContext, useState } from 'react'
import { Label as LabelType, LabelTodo, todoListCtx } from 'context/list'
import styled, { css, keyframes } from 'styled-components'

const Label = ({ _id, color, name, todos }: LabelType) => {
  const { selectLabel } = useContext(todoListCtx)
  const [clicked, setClicked] = useState<boolean>(false)
  const isCompleted = todos.filter((todo: LabelTodo) => !todo.completed).length === 0
  const handleClick = useCallback(() => setClicked((prevState: boolean) => !prevState), [setClicked])
  const incompleteTodosCount = todos.filter((todo: LabelTodo) => !todo.completed).length

  return (
    <StyledLabel
      color={color}
      $onClick={clicked}
      onMouseDown={handleClick}
      onMouseUp={(handleClick)}
      onClick={() => selectLabel(_id)}
    >
      <Icon $completed={isCompleted} color={color} />
      <LabelName $completed={isCompleted}>{name}</LabelName>
      <Count>{incompleteTodosCount}</Count>
    </StyledLabel>
  )
}

const Icon = styled.button<{ $completed: boolean, color: string }>`
  aspect-ratio: 1;
  background-color: ${({ $completed, color }) => $completed ? `var(--color--${color})` : 'transparent'};
  border: 2px solid var(--color--${({ color }) => color});
  border-radius: 4px;
  height: 13px;
  padding: 0;
  width: 13px;
`

const LabelName = styled.span<{ $completed: boolean }>`
`

const Count = styled.span`
  align-items: center;
  background-color: var(--color--gray-1);
  border-radius: 6px;
  color: var(--color--gray-2);
  display: flex;
  font-size: 12px;
  font-weight: 700;
  justify-content: center;
  justify-self: flex-end;
  padding: 4px 6px;
  width: fit-content;
`

const labelClickAnimation = keyframes`
  0% {
    transform: translate(-100%, 11%) skew(44deg, 0deg);
  }
  100% {
    transform: translate(-50%, -40%) skew(44deg, 0deg);
  }
`

const StyledLabel = styled.li<{ color: string, $onClick: boolean }>`
  align-items: center;
  border-radius: 8px;
  column-gap: 16px;
  display: grid;
  font-size: 16px;
  font-weight: 500;
  grid-template-columns: 2fr 32fr 6fr;
  overflow: hidden;
  padding: 14px 18px;
  position: relative;
  transition: all .35s ease;
  &:hover {
    background: linear-gradient(118deg, var(--color--${({ color }) => color}--translucent), #f3f4f69c 75%);
    cursor: pointer;
  }
  --local-animation-color: var(--color--${({ color }) => color}--translucent);

  ${({ $onClick, color }) => $onClick
    ? css`

      &::before {
        animation: ${css`${labelClickAnimation} .55s 1`};
        content: '';
        position: absolute;
        width: 250%;
        transform: translate(-100%, 11%) skew(80deg, 0deg);
        background-color: var(--color--${color});
        border-top-right-radius: 174px;
        height: 200%;
        top: -11px;
        opacity: 0.05;
        border-bottom-right-radius: 46px;
        transition: all .1s ease;
      }
    `
    : ''
  }
`

export default Label