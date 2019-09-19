import React from 'react'
import Person from './Person';

class Room extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      people: [],
      totalVisits: 1
    }
  }

  newVisit = () => {
    this.setState({totalVisits: this.state.totalVisits + 1, loading: true})
  }

  removePerson = id => {
    // console.log("remove person with id", id)
    this.setState({
      people: this.state.people.filter(person => person.id !== id)
    })
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
        this.setState({
          people: [...this.state.people, ...newPerson],
          totalVisits: this.state.people.length + newPerson.length,
          loading: false
        })
      })
  }

  componentDidMount() {
    this.fetchPerson()
  }

  componentDidUpdate(_, prevState) {
    if(this.state.totalVisits > prevState.totalVisits && this.state.loading){
      this.fetchPerson()
    }
  }

  render(){
    const {people, loading} = this.state
    return(
      <div className="room-container">
        <button onClick={this.newVisit}>New Visitor</button>
        {
          people.map(person => (
            <Person {...person} key={person.id} remove={this.removePerson}/>
          ))
        }
        {loading && <Person pending />}
      </div>
    )
  }
}

export default Room
