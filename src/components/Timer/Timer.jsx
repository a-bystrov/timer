import styles from './Timer.module.css'
import play from '../../images/play.png'
import pause from '../../images/pause.png'
import deleteImg from '../../images/delete.png'
import vector from '../../images/vector.png'
import { useEffect, useState } from 'react'

export default function Timer(props) {
  const [isStart, setIsStart] = useState(props.isStart)
  const [currentTime, setCurrentTime] = useState(props.time)
  const currentMinutes = Math.floor(currentTime / 60)
  const currentSeconds = currentTime % 60
  const minutes = Math.floor(props.time / 60)
  const seconds = props.time % 60

  useEffect(()=>{
    if(isStart && currentTime != 0) {
      setTimeout(()=>{
        const newTime = currentTime - 1
        setCurrentTime(newTime)
      }, 1000)
    }
  }, [currentTime, isStart])

  function handleClickPlayAndPause() {
    const newState = !isStart
    setIsStart(newState)

    if(isStart && currentTime != 0) {
      setTimeout(()=>{
        const newTime = currentTime - 1
        setCurrentTime(newTime)
      }, 1000)
    }
  }

  function handleClickVector() {
    console.log('click vector!!!')
  }

  return (
      <div className={ styles.timer }>
        {
          props.isEdit &&
          <img src={ deleteImg } alt="" className={ styles.deleteImg} onClick={ () => props.handleClickDelete(props.time) }/>
        }
        <div className={ styles.timeAndStart}>
          <div className={ styles.time }>
            <div className={ styles.remainingTime}>{ currentMinutes + ':' + `${String(currentSeconds).length == 2 ? currentSeconds : '0' + currentSeconds}`}</div>
            <div className={ styles.presetTime }>{ `${minutes} мин ${seconds} сек` }</div>
          </div>
          {
            props.isEdit ?
            <img src={ vector } alt="" className={ styles.vector } onClick={ handleClickVector}/>
            :
            <img src={ isStart ? pause : play } alt="" className={ styles.play } onClick={ handleClickPlayAndPause }/>
          }
          
        </div>
      </div>
  )
}