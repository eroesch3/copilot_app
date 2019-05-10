import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';

import ActivitiesView from './components/ActivitiesView';
import ActivityPage from './components/ActivityPage';
import CreateActivity from './components/CreateActivity'
import Login from './components/Login'
import Register from './components/Register'

import {
  createActivity,
  readAllActivities,
  updateActivity,
  destroyActivity,
  loginUser,
  registerUser
} from './services/api-helper'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      showCreate: false,
      activities: [],
      activityForm: {
        name: "",
        category: "",
        hours_spent: null,
        date: null

      },
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    };
    this.handleFormChange = this.handleFormChange.bind(this)
    this.mountEditForm = this.mountEditForm.bind(this)
    this.editActivity = this.editActivity.bind(this)
    this.deleteActivity = this.deleteActivity.bind(this)
    this.newActivity = this.newActivity.bind(this)
    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.authHandleChange = this.authHandleChange.bind(this)
  }

  async getActivities() {
    const activities = await readAllActivities(this.state.user_id);
    this.setState({
      activities
    })
  }

  async newActivity(e, getActivities) {
    e.preventDefault();
    const activityObject = {
      category: e.target.category.value,
      name: e.target.name.value,
      hours_spent: e.target.hours_spent.value,
      date: e.target.date.value
    }

    const activity = await createActivity(this.state.user_id, activityObject)
    this.setState(prevState => ({
      activities: [...prevState.activities, activity],
      showCreate: false,
      activityForm: {
        name: "",
        category: "",
        hours_spent: null,
        date: null
      }
    }))
    this.getActivities();
  }

  async editActivity(e) {
    e.preventDefault();
    console.log("e: ", e.target.category.value)
    const activityObject = {
      category: e.target.category.value,
      name: e.target.name.value,
      hours_spent: e.target.category.hours_spent,
      date: e.target.category.date
    }
    console.log(this.state.user_id)
    const activity = await updateActivity(this.state.user_id, activityObject)
    this.setState(prevState => ({
      activities: [...prevState.activities, activity],
      showCreate: false,
      activityForm: {
        name: "",
        category: "",
        hours_spent: null,
        date: null
      }
    }))
    this.getActivities();
  }


  async deleteActivity(id) {
    await destroyActivity(this.state.user_id, id);
    this.setState(prevState => ({
      activities: prevState.activities.filter(activity => activity.id !== id)
    }))
    this.getActivities();
  }

  handleFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      activityForm: {
        ...prevState.activityForm,
        [name]: value
      }
    }))
  }

  async mountEditForm(id) {
    const activities = await readAllActivities(this.state.user_id);
    const activity = activities.find(el => el.id === parseInt(id));
    this.setState({
      activityForm: activity
    });
  }

  // -------------- AUTH ------------------

  handleLoginButton() {
    this.props.history.push("/login")
  }

  async handleLogin() {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: decode(userData.user.token),
      user_id: userData.user.id
    })
    localStorage.setItem("jwt", userData.user.token)
    this.getActivities();
  }

  async handleRegister(e) {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
    window.location.pathname = '/';
  }

  authHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {

    const onActivitiesPage = window.location.pathname.slice(-10) === 'activities' ? true : false
    console.log(onActivitiesPage)
    const user_id = this.state.user_id

    return (
      <div className="App">
        <header>
          <h1><Link to='/' onClick={() => this.setState({
            activityForm: {
              name: "",
              category: "",
              hours_spent: null,
              date: null
            }
          })}>Copilot</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login/Register</button>
            }
          </div>
        </header>
        
          {this.state.currentUser && <Link to={`/users/${user_id}/activities`}>View Activities</Link> }
        <br /> 

        <h2> {this.state.currentUser && <Link to={`/users/${user_id}/activities`} onClick={() => this.setState({
            showCreate: true
        })}>Create Activity</Link> } </h2>

        {/* <Link to={`/users/${user_id}/activities`}>Create Activity</Link>&nbsp; */}

{/* XXXXXXXXXXXXXX */}

        <Route exact path="/login" render={() => (
          !this.state.currentUser && <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />

        <Route
          path={`/users/${user_id}/activities`}
          render={() => (
          this.state.showCreate &&  <CreateActivity
              handleFormChange={this.handleFormChange}
              activityForm={this.state.activityForm}
              newActivity={this.newActivity}
              getActivities={this.getActivities}
            />
          )} />  

        <Route
          path={`/users/${user_id}/activities`}
          render={(props) => {
            return onActivitiesPage && <ActivitiesView
              user_id={user_id}
              username={this.state.currentUser.username}
              activities={this.state.activities}
              handleFormChange={this.handleFormChange}
              activityForm={this.state.activityForm}
              newActivity={this.newActivity} />
          }} />


        


        <Route
          path={`/users/${user_id}/activities/:id`}

          render={(props) => {
            const { id } = props.match.params;
            const activity = this.state.activities.find(el => el.id === parseInt(id));

            { console.log('activityForm in App.js:', this.state.activityForm) }

            return <ActivityPage
              id={id}
              activity={activity}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editActivity={this.editActivity}
              activityForm={this.state.activityForm}
              deleteActivity={this.deleteActivity} />
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);