import { useNavigate } from 'react-router-dom'
import styles from './MainPage.module.css'

export default function MainPage(props) {
  const navigate = useNavigate()

  function handleClickAddTimer() {
    navigate('/addTimer')
  }

  return (
    <div className={ styles.mainPage }>
      <div className={ styles.header}>
        <p className={ styles.edit} onClick={ props.handleClickEdit }>{props.isEdit ? 'Готово' : 'Править' }</p>
        <p className={ styles.addTimer } onClick={handleClickAddTimer}>+</p>
      </div>
      <h1 className={ styles.headerTimers }>Таймеры</h1>
      { props.timers.map((item)=>{
        return item
      })}
    </div>
  )
}