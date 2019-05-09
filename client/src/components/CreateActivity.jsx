import React from 'react';
import { withRouter } from 'react-router-dom';

function CreateActivity(props) {
  return (
    <div className="create-form" >
      <h2>Create a new activity</h2>
      <form onSubmit={props.newActivity}>
        <p>Category:</p>
        <input
          type="text"
          name="category"
          value={props.activityForm.category}
          onChange={props.handleFormChange} />
          <p>Activity name:</p>
        <input
          type="text"
          name="name"
          value={props.activityForm.name}
          onChange={props.handleFormChange} />
            <p>Hours Spent (15 mins = 0.25 hrs):</p>
        <input
          type="float"
          name="hours_spent"
          value={props.activityForm.hours_spent}
          onChange={props.handleFormChange} />
            <p>Date:</p>
        <input
          type="date"
          name="date"
          value={props.activityForm.date}
          onChange={props.handleFormChange} />
        <button>Submit</button>
      </form>
    </div >
  )
}

export default withRouter(CreateActivity);
