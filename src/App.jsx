import './App.css'
import {Provider} from 'react-redux'
import store from './store/Store'
import {Container, Typography} from '@mui/material'
import AddhabitForm from './Component/add-habit-form'
import HabitList from './Component/habit-list'
import HabitStates from './Component/habit-stats'

function App() {


  return (
  <Provider store={store}>
   <Container maxWidth='md'>
<Typography component='h1' variant='h2' align='center'>Habit Tracker</Typography>
<AddhabitForm />
<HabitList />
<HabitStates />
</Container>
  </Provider>
  )
}

export default App
