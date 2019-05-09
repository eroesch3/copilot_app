import React, { Component } from 'react';
import EditActivity from './EditActivity'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { activity } = this.props;

    console.log('activityForm in ActivityPage.js:', this.props.activityForm)

    // console.log('activityForm in ActivityPage.js:', this.props.activityForm)


    // const passing = this.props

    return (
      <div className="activities-page">

      <h1>THIS IS ACTIVITY PAGE</h1>

        {activity === undefined ? <h2>Loading . . .</h2> : (
          <div>
            {/* <img alt={activity.name} src={activity.photo} /> */}
            {/* <EditActivity/> */}
            
            { this.state.isEdit ?
              <Route path={'/users/:user_id/activities/:id/edit'}
              render={(props) => (
                <EditActivity
                {...props}
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editActivity(e);
                    // setState({ isEdit: false })
                    this.props.history.push(`/activities/${this.props.activityForm.id}`)
                  }}
                  activityForm={this.props.activityForm} />
              )} />
              :
              <>
                <h1>{activity.name}</h1>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`${activity.id}/edit`)
                }}>Edit</button>
                <button onClick={() => {
                  this.props.deleteActivity(activity.id);
                  this.props.history.push('/')
                }}>Delete</button>
              </>
            }
          </div>)}
      </div>)
  }
}

export default withRouter(ActivityPage);