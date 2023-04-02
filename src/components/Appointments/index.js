import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isStarred: false}

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointObject = {
      id: uuidv4(),
      title,
      date,
      isLiked: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointObject],
      title: '',
      date: '',
    }))
  }

  onChangeOfTitle = event => {
    this.setState({title: event.target.value})
  }

  onchangeOfDate = event => {
    this.setState({date: event.target.value})
  }

  onStarred = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  onStarIcon = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  onFilterList = () => {
    const {appointmentList, isStarred} = this.state
    let filterList = null
    if (isStarred) {
      filterList = appointmentList.filter(
        eachItem => eachItem.isLiked === isStarred,
      )
    } else {
      filterList = appointmentList
    }
    return filterList
  }

  render() {
    const {title, date} = this.state
    const FilterList = this.onFilterList()
    console.log('hi')

    return (
      <div className="bg-container">
        <div className="card-body">
          <div className="input-body">
            <h1 className="appointment-heading">Add Appointment</h1>
            <div className="form-card">
              <form className="form-el" onSubmit={this.onAddAppointment}>
                <label htmlFor="title-id" className="title-label">
                  Title
                </label>
                <input
                  placeholder="Title"
                  type="text"
                  className="title-input"
                  id="title-id"
                  value={title}
                  onChange={this.onChangeOfTitle}
                />
                <label htmlFor="date-id" className="date-label">
                  Date
                </label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="date-input"
                  id="date-id"
                  value={date}
                  onChange={this.onchangeOfDate}
                />
                <div>
                  <button className="add-button" type="submit">
                    Add
                  </button>
                </div>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="appointment-image"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="hr-rule" />
          <div className="appointment-body">
            <div className="appointment-indication-card">
              <h1 className="instruction-heading">Appointments</h1>
              <div>
                <button
                  className="starred-button"
                  type="submit"
                  onClick={this.onStarred}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul className="appointment-card">
              {FilterList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentObject={eachItem}
                  onStarIcon={this.onStarIcon}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
