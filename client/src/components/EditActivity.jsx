import React from 'react';
import { withRouter } from 'react-router-dom';

// console.log('activityForm in EditActivity:', this.props.activityForm)

function EditActivity(props, e) {
  return (
    <div>
      <h3>Edit previous activity {console.log(props.activityForm)}</h3>
      <form onSubmit={props.handleSubmit}>
        <p>Category FROM ACTIVITY:</p>
        <input
          type="text"
          name="category"
          // value={props.activityForm.category}
          onChange={props.handleFormChange} />
        <p>Activity name:</p>
        <input
          type="text"
          name="name"
          // value={props.activityForm.name}
          onChange={props.handleFormChange} />

        <p>Hours Spent (15 mins = 0.25 hrs):</p>
        <input
          type="float"
          name="hours_spent"
          // value={props.activityForm.hours_spent}
          onChange={props.handleFormChange} />
            <p>Date:</p>
        <input
          type="date"
          name="date"
          // value={props.activityForm.date}
          onChange={props.handleFormChange} />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(EditActivity);
