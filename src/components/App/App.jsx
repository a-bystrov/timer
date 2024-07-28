import { useEffect, useState } from 'react';
import AddTimer from '../AddTimer/AddTimer'
import MainPage from '../MainPage/MainPage'
import styles from './App.module.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Timer from '../Timer/Timer';
import ControlTimer from '../ControlTimer/ControlTimer';

export default function App() {
  const [isEdit, setIsEdit] = useState(false)
  const [timeControl, setTimeControl] = useState()
  const [remainingTimeControl, setRemainingTimeControl] = useState()
  const [isStartControl, setIsStartControl] = useState(false)
  const [timers, setTimers] = useState([
    <Timer time='120' isEdit={isEdit} key = '120' handleClickDelete = { handleClickDelete } />,
    <Timer time='45' isEdit={isEdit} key = '45' handleClickDelete = { handleClickDelete } />
  ])
  const [radiusControl, setRadiusControl] = useState(0)

  useEffect(()=>{
    const newTimers = []
    for(let timer of timers) {
      newTimers.push(
        <Timer time={timer.props.time} isEdit={isEdit} key = {timer.props.time} handleClickDelete = { handleClickDelete } />
      )
    }
    setTimers(newTimers)
  }, [isEdit])

  useEffect(()=>{
    if(isStartControl && (remainingTimeControl != 0)) {
      setTimeout(()=>{
        const newTime = remainingTimeControl - 1
        setRemainingTimeControl(newTime)
        const newRadius = radiusControl + 360 / timeControl
        setRadiusControl(newRadius)
      }, 1000)
    }
  }, [remainingTimeControl, isStartControl])

  function handleClickStart(time) {
    
    const newTimers = [...timers, <Timer time={ time } key = { time } isEdit={ isEdit } handleClickDelete = { handleClickDelete } />]

    setTimeControl(time)
    setRemainingTimeControl(time)
    setIsStartControl(true)
    setTimers(newTimers)
  }

  function handleClickEdit () {
    const newState = !isEdit
    setIsEdit(newState)
  }

  function handleClickDelete(time) {
    const newTimers = [...timers]
    for(let i in newTimers) {
      if(newTimers[i].props.time == time) {
        newTimers.splice(i, 1)
      }
    }

    setTimers(newTimers)
    setIsEdit(false)
  }

  function handleClickPauseControl() {
    const newState = !isStartControl
    setIsStartControl(newState)
  }

  function handleClickCancelControl() {
    setRemainingTimeControl(timeControl)
    setIsStartControl(false)
    setRadiusControl(0)
  }

  function handleClickTimersControl() {
    setIsStartControl(false)
    setRadiusControl(0)
    setRemainingTimeControl(0)
  }

  return(
    <div className={ styles.app }>
      <Router>
        <Routes>
          <Route path='/' element={ <MainPage timers={ timers } handleClickEdit={ handleClickEdit } isEdit = { isEdit } /> } />
          <Route path='/addTimer' element={ <AddTimer handleClickStart={ handleClickStart } timers = { timers }/> } />
          <Route path='/controlTimer' element={ <ControlTimer time={ timeControl } 
          remainingTime={ remainingTimeControl } 
          isStart={isStartControl} 
          handleClickPause={handleClickPauseControl}
          handleClickCancel={handleClickCancelControl}
          radius = {radiusControl} 
          handleClickTimers={handleClickTimersControl}/>
          }
           />
        </Routes>
      </Router>
    </div>
  )
}