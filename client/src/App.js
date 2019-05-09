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


  // componentDidMount() {
  //   this.getTeachers();
  //   const checkUser = localStorage.getItem("jwt");
  //   if (checkUser) {
  //     const user = decode(checkUser);
  //     this.setState({
  //       currentUser: user
  //     })
  //   }
  // }

  async getActivities() {
    const activities = await readAllActivities(this.state.user_id);
    this.setState({
      activities
    })
  }


    async newActivity(e) {
      e.preventDefault();
      console.log("e: ", e.target.category.value)
      const activityObject = {
        category: e.target.category.value,
        name: e.target.name.value,
        hours_spent: e.target.category.hours_spent,
        date: e.target.category.date
      }
      console.log(this.state.user_id)
      const activity = await createActivity(this.state.user_id, activityObject)
      this.setState(prevState => ({
        activities: [...prevState.activities, activity],
        activityForm: {
          name: "",
          category: "",
          hours_spent: null,
          date: null
        }
      }))
      }



      // async editActivity() {
      //   const { activityForm } = this.state
      //   await updateActivity(this.state.user_id, activityObject);
      //   this.setState(prevState => (
      //     {
      //       activities: prevState.activities.map(activity => activity.id === activityForm.id ? activityForm : activity),
      //     }
      //   ))
      // }


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
          activityForm: {
            name: "",
            category: "",
            hours_spent: null,
            date: null
          }
        }))
        // this.setState(prevState => ({
        //   activities: prevState.activities.map(activity => activity.id === activityForm.id ? activityForm : activity)
        
        // this.setState(prevState => ({
        //   activities: prevState.activities.map(activity => activity.id === activityForm.id ? activityForm : activity)
        //   // activities: [...prevState.activities, activity],
        //   activityForm: {
        //     name: "",
        //     category: "",
        //     hours_spent: null,
        //     date: null
        //   }
          
        // }))
        }
  

  async deleteActivity(id) {
    // await destroyActivity(id);
    await destroyActivity(this.state.user_id, id);
    this.setState(prevState => ({
      activities: prevState.activities.filter(activity => activity.id !== id)
    }))
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

        <Link to={`/users/${user_id}/activities`}>View Activities</Link>
        <br/>
        <Link to={`/users/${user_id}/activities`}>Create Activity</Link>&nbsp;
        {/* <Link to="/flavors">Flavors</Link> */}


        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />


{/* XXXXXXXXXXXXXXXXXXXXXXXXXX  Option 1: Noon Tues  WIP SHOW ACTIVITIES IF NEED TO GO BACK */}
        
        {/* <Route
          exact path="/users/:user_id/activities"
          render={() => (
            <ActivitiesView
              activities={this.state.activities}
              activityForm={this.state.activityForm}
              handleFormChange={this.handleFormChange}
              newActivity={this.newActivity} />
          )}
        /> */}

{/* XXXXXXXXXXXXXXXXXXXXXXXXXX Option 2:  11:10AM Tues WIP SHOW ACTIVITIES IF NEED TO GO BACK */}
        <Route
          path={`/users/${user_id}/activities`}
          render={(props) => {
            // const { user_id } = props.match.params;
            // const { id } = props.match.params;
            // const id = this.state.activities.find(el => el.id
            // === parseInt(id)); 
            return  onActivitiesPage && <ActivitiesView
              user_id={user_id}
              activities={this.state.activities}
              handleFormChange={this.handleFormChange}
              activityForm={this.state.activityForm}
              newActivity={this.newActivity} /> 
          }} />
{/* XXXXXXXXXXXXXXXXXXXXXXXXXX     END OF SHOW ACTIVITIES */}


        <Route
          path={`/users/${user_id}/activities`}
          render={() => (
            <CreateActivity
              handleFormChange={this.handleFormChange}
              activityForm={this.state.activityForm}
              newActivity={this.newActivity} />
          )} />


        <Route
          path={`/users/${user_id}/activities/:id`}
          
          render={(props) => {
            const { id } = props.match.params;
            const activity = this.state.activities.find(el => el.id === parseInt(id));

            {console.log('activityForm in App.js:', this.state.activityForm)}
            
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