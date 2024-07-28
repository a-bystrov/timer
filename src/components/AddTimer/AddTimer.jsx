import { useState } from 'react'
import styles from './AddTimer.module.css'
import { useNavigate } from 'react-router-dom'

export default function AddTimer(props) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const navigate = useNavigate()

  function handleClickCancel() {
    setMinutes(0)
    setSeconds(0)
    navigate('/')
  }

  function handleChangeInputMinutes(event) {
    let value = event.target.value
    if(value > 59) {
      event.target.value = 59
      value = 59
    } else if(value < 0) {
      event.target.value = 0
      value = 0
    }
    setMinutes(value)
  }

  function handleChangeInputSeconds(event) {
    let value = event.target.value
    if(value > 59) {
      event.target.value = 59
      value = 59
    } else if(value < 0) {
      event.target.value = 0
      value = 0
    }
    setSeconds(value)
  }
  
  function handleClickStart() {
    const time = minutes * 60 + Number(seconds)

    if(time == 0) return
    for(let timer of props.timers) {
      if(timer.props.time == time) {
        alert('Такой таймер уже есть!')
        return
      }
    }

    props.handleClickStart(time)
    navigate('/controlTimer')
  }

  return (
    <div className={ styles.addTimer }>
      <p className={ styles.cancel } onClick={ handleClickCancel }>Отменить</p>
      <h1 className={ styles.headerAddTimer}>Таймер</h1>
      <div className={ styles.timeAndButton}>
        <div className={ styles.time }>
          <input type="number" className={ styles.inputTime } defaultValue={ 0 } onChange={handleChangeInputMinutes}/>
          <p className={ styles.unitsTime}>мин</p>
          <input type="number" className={ styles.inputTime } defaultValue={ 0 } onChange={handleChangeInputSeconds}/>
          <p className={ styles.unitsTime}>сек</p>
        </div>
        <button className={ styles.buttonStart } onClick={ handleClickStart }>Старт</button>
      </div>
    </div>
  )
}