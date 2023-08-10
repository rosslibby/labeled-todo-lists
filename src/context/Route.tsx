import { ReactNode, useContext } from 'react'
import { NavCtx } from './nav'

type RouteProps = {
  children: ReactNode
  path: string
}

export const Route = ({ children, path }: RouteProps) => {
  const { route } = useContext(NavCtx)

  // handle routes with variables
  // e.g:
  // /route/:id

  const correctPath = path.indexOf('/:') > -1
    ? path.split(':')[0] === route.path.substring(0, path.split(':')[0].length)
    : route.path === path
  
  console.log(correctPath, path.indexOf('/:'))

  return correctPath ? (
    <>{children}</>
  ) : null
}
