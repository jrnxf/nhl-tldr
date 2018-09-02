import React, { Component } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';
import { Link } from 'react-router-dom';

class Team extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8000/api/players/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState(() => ({
          teamName: data.name,
          players: data.roster.roster
        }))
      });
  }
  render = () => {
    if (!this.state){
      return null;
    }

    const { players, teamName } = this.state;
    return (
      <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li className="is-active"><Link to={''}>{teamName}</Link></li>
          </ul>
        </nav>
        <div className="columns is-multiline is-mobile">
          {
            players.map((player, i) => {
              return (
                <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                  <PlayerCard {...player} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Team;