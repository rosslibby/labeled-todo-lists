import { Location, createBrowserHistory } from 'history'
import qs from 'querystringify'
import { ReactNode, createContext, useCallback, useContext, useLayoutEffect, useState } from 'react'
import { Label, todoListCtx } from './list'

type LocationToRouteProps = {
  location: Location
}

export type RouteType = {
  path: string
  hash: string
  query: Object
}

type NavCtxType = {
  route: RouteType
  routes: RoutesType
}

export const locationToRoute = ({ location }: LocationToRouteProps) => ({
  path: location.pathname,
  hash: location.hash,
  query: qs.parse(location.search),
})

export const history = createBrowserHistory()

export const NavCtx = createContext<NavCtxType>({
  route: locationToRoute(history),
  routes: {},
})

export type RoutesType = {
  [route: string]: {
    path: string
  }
}

type NavCtxProps = {
  children: ReactNode
}

export const initialRoutes: RoutesType = {
  home: {
    path: '/'
  },
  listById: {
    path: '/list/:id'
  }
}

export const NavProvider = ({ children }: NavCtxProps) => {
  const [routes, setRoutes] = useState<RoutesType>(initialRoutes)
  const [route, setRoute] = useState(locationToRoute(history))
  const handleRouteChange = (location: { location: Location }) => {
    setRoute(locationToRoute(location))
  }

  useLayoutEffect(() => {
    let unlisten = history.listen(handleRouteChange)

    return () => {
      unlisten()
    }
  }, [])

  return (
    <NavCtx.Provider value={{ route, routes }}>
      {children}
    </NavCtx.Provider>
  )
}

export const useRouter = () => useContext(NavCtx)