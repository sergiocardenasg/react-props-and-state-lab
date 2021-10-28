import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onFindPets = () => {
    let url = "/api/pets"

    if (this.state.filters.type !== "all") {
      url += `?type=${this.state.filters.type}`
    }
    
    fetch(url)
      .then(res => res.json())
      .then(pets => this.setState({ pets: pets }))
  }

  onChangeType = ({target: {value}}) => {
    this.setState({
      ...this.pets, 
      filters: {
        type: value
      }
    })
  }

  onAdoptPet = (petID) => {
    const adoptedPets = this.state.pets.map(pet => {return pet.id === petID ? {...pet, isAdopted: true} : pet})
    this.setState({pets: adoptedPets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
