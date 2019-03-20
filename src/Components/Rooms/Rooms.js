import React, { Component } from 'react';
import roomGenerate from '../../Utils/roomGenerator.js';
import './index.css';
import {connect}   from 'react-redux';
import * as actions from '../../actions/choiceReducer.js';

let prevAnswerFromServer = {
  data: '15.03.19',
  time: '19:00',
	price: 100,
	room : 1,
	film : 777,
			}
let data = {
  1: {
    name: 'green',
    space: roomGenerate(7,14)
  }
}

let mapStateToProps = state => ({places: state.places.places})

class Rooms extends Component {
  state = {
    room: null,
    price: 0,
  }
  generateHall = () => {
    let res = []
    let line = []
    this.state.room.space.forEach((elem, ind, arr) =>{
      if ( elem.row === (arr[ind+1] ? arr[ind+1].row : null) ) {
        line.push(elem)
      }
      else {
        line.push(elem)
        res.push(line)
        line = []
      }
    })
    return res
  }
  mouseHandler = elem => event => {
    if ( !elem.flag && !this.checkId(elem.id) ) event.target.style.background = 'orange'
  }

  mouseOutHandler = elem => event => {
    if ( !elem.flag && !this.checkId(elem.id) ) event.target.style.background = 'blue'
  }

  checkId = id => this.props.places.some( el => el.id === id )

  clickHanler = elem => event => {
    console.log(elem)
    if ( elem.flag ) return
    let newMass = [...this.props.places]
    let check = newMass.indexOf( elem )
    check > -1 ? newMass.splice( check, 1 ) : newMass.push(elem)
    this.props.setPlaces(newMass)
    console.log('cilck', this.props.places)
  }


  componentDidMount(){
    this.setState({ room: data[1], price: prevAnswerFromServer.price })
    this.props.setPrice( prevAnswerFromServer.price )
  }

  render(){
    if ( !this.state.room )return ( <div className = 'room'>Loading...</div> )
    return (
      <div className = 'room'>
        <h1 className = 'room__title'>{this.state.room.name}</h1>
        <div className = 'room__hall'>
          {this.generateHall().map((line, ind) =>(
            <div className ='room__hall__line' key = {ind}>
              {line.map((elem,index) =>{
                let inStock = this.checkId(elem.id)
                console.log(inStock,elem.id)
                return(
                <div className = 'room__hall__line__cell'
                     key = {index + ind}
                     title = {`ряд: ${elem.row}; место: ${elem.place}; цена: ${this.state.price}`}
                     style = {{background: inStock ? 'orange' : elem.flag ? 'gray' : 'blue',
                              color: elem.flag ? 'gray' : 'blue'}}
                     onMouseOver = {this.mouseHandler(elem)}
                     onMouseOut = {this.mouseOutHandler(elem)}
                     onClick = {this.clickHanler(elem)}>
                     {elem.place}
                  </div>
              )})}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Rooms = connect ( mapStateToProps, actions )(Rooms)
export default Rooms
