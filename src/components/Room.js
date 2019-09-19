import React, { Component } from 'react'

class Room extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      people: [],
      totalVisits: 1
    }
  }

  componentWillMount() {
    this.fetchPerson()
  }

  fetchPerson = () => {
    fetch('https://randomuser.me/api/?inc=name,login,picture&nat=us')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        const newPerson = data.results.map(person => {
          return (
            {
              id: person.login.uuid,
              name: `${person.name.first} ${person.name.last}`,
              picture: person.picture.large
            }
          )
        })
        console.log(newPerson)
      })
  }

  render(){
    return(
      <div className="room-container">
        Hello there
      </div>
    )
  }
}

export default Room
