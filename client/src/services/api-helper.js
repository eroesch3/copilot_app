const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://co-pilot-app.herokuapp.com'

export const loginUser = (loginData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${baseUrl}/auth/login`, opts)
    .then(resp => resp.json())
}

export const registerUser = (registerData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ user: registerData }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${baseUrl}/users/`, opts)
    .then(resp => resp.json())
}


const readAllActivities = (user_id) => {
  return fetch(`${baseUrl}/users/${user_id}/activities`)
  // return fetch(`${baseUrl}/activities`)
    .then(resp => resp.json())
}


const createActivity = (user_id, data) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ activity: data }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log(opts.body)
  return fetch(`${baseUrl}/users/${user_id}/activities`, opts)
    .then(resp => resp.json())
}


// ,( window.location.pathname.indexOf("/edit") - ( 11 + window.location.pathname.indexOf("activities/")))

const updateActivity = (user_id, data) => {
  const activityId = window.location.pathname.slice((11 + window.location.pathname.indexOf("activities/")), ( window.location.pathname.indexOf("/edit")))
  
  console.log('activity ID:', activityId)
  console.log(data)
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ activity: data }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/users/${user_id}/activities/${activityId}`, opts)
    .then(resp => resp.json())
}



const destroyActivity = (user_id, activityId) => {
  // const activityId = window.location.pathname.slice((11 + window.location.pathname.indexOf("activities/")), ( window.location.pathname.indexOf("/edit")))
  console.log('activity id:', activityId)
  console.log('activity id:', user_id)
  const opts = {
    method: 'DELETE'
  }
  return fetch(`${baseUrl}/users/${user_id}/activities/${activityId}`, opts)
}

export {
  createActivity,
  readAllActivities,
  updateActivity,
  destroyActivity
}
