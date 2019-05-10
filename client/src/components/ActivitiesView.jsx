import React from 'react';
import { withRouter } from 'react-router';

function ActivitiesView(props) {
  console.log(props)
  console.log(props.user_id)
  return (

<div className="activity-container">


<h1>{props.username}'s Logged Activities</h1>

<div className="act-box">
<div className="act-headers">
Hours &nbsp; Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Category
</div>
      {props.activities.map(activity => (
        <div
          key={activity.id}
          className="activity-card"
          onClick={(e) => {
            props.history.push(`activities/${activity.id}`);
            window.scrollTo(0, 0);
          }}>
            <p className="activity-row">
            <span className="hours-spent">
            {activity.hours_spent? activity.hours_spent : "na" } 
            </span>
            &nbsp; 
            <span className="name">
            {activity.name? activity.name : "na" } 
            </span>
            &nbsp; 
            <span className="date">
            {activity.date? activity.date : "na" } 
            </span> 
            &nbsp; 
            <span className="category">
            {activity.category? activity.category : "na" } 
            </span>
            </p>
          

        </div>
      ))}
    </div>  
    </div>
  )
}

export default withRouter(ActivitiesView)