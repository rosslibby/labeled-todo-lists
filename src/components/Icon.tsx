import styled from 'styled-components'

export const Icon = styled.button<{ $completed: boolean, color: string }>`
  aspect-ratio: 1;
  background-color: ${({ $completed, color }) => $completed ? `var(--color--${color})` : 'transparent'};
  border: 2px solid var(--color--${({ color }) => color});
  border-radius: 4px;
  height: 13px;
  padding: 0;
  width: 13px;
`