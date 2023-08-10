import { MouseEvent, ReactNode } from 'react'
import { useRouter, history } from 'context/nav'

type LinkProps = {
  to: string
  children: ReactNode
  onClick?: (e: MouseEvent) => void
}

export const Link = ({ to, children, onClick, ...props }: LinkProps) => {
  const { route } = useRouter()

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()

    if (route.path === to) return
    if (onClick) onClick(e)

    history.push(to)
  }

  return (
    <>
      <a {...props} onClick={handleClick}>
        {children}
      </a>
    </>
  )
}
