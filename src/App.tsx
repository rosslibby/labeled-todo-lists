import { TodoListProvider } from 'context/list'
import './App.css'
import Body from 'components/Body'

function App() {
  return (
    <TodoListProvider>
      <Body />
    </TodoListProvider>
  )
}

export default App
