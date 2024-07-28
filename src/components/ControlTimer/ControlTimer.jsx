import { useState } from 'react'
import styles from './ControlTimer.module.css'
import { useNavigate } from 'react-router-dom'

export default function ControlTimer(props) {
  const minutes = Math.floor(props.remainingTime / 60)
  const seconds = props.remainingTime % 60
  const navigate = useNavigate()

  function handleClickPause() {
    props.handleClickPause()
  }

  function handleClickCancel() {
    props.handleClickCancel()
  }

  function handleClickTimers() {
    props.handleClickTimers()
    navigate('/')
  }

  return(
    <div className={ styles.controlTimer }>
      <p className={ styles.timers } onClick={ handleClickTimers }>Таймеры</p>
      <div className={ styles.borderContainerTime} style={{background: `conic-gradient(#29A354 ${props.radius}deg, #1A1F23 0deg)`}}>
        <div className={ styles.containerTime}>
          <div className={ styles.remainingTime }>{`${minutes}:${String(seconds).length == 2 ? seconds : '0' + seconds}`}</div>
        </div>
      </div>
      <div className={ styles.buttons }>
        <button className={ `${styles.buttonPause} ${styles.button}` }
                onClick={ handleClickPause }>{props.isStart ? 'Пауза' : 'Возобновить'}</button>
        <button className={ `${styles.buttonCancel} ${styles.button}` } onClick={ handleClickCancel }>Отмена</button>
      </div>
    </div>
  )
}