import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentObject, onStarIcon} = props
  const {id, title, date, isLiked} = appointmentObject
  const applyDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const applyLikeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStar = () => {
    onStarIcon(id)
  }

  return (
    <li className="list-item">
      <div className="title-card">
        <p className="title-el">{title}</p>
        <div>
          <button
            className="like-icon-button"
            type="submit"
            onClick={onStar}
            data-testid="star"
          >
            <img src={applyLikeImage} className="like-icon" alt="star" />
          </button>
        </div>
      </div>
      <p className="date-el">{applyDate}</p>
    </li>
  )
}

export default AppointmentItem
