import React,{useContext} from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import FormContainer from "./components/FormContainer/FormContainer";

import './App.scss';
import {useState, useEffect} from "react";
import {Items} from "./data";
import * as CONSTANTS from "./Constants";

class App extends React.Component {

     constructor(props) {
         super(props);
         this.state = {
             title: CONSTANTS.HEADER_TITLE,
             selected:0,
             items:Items,
             past:[],
             present:Items,
             future:[]
         };
         this.saveItem = this.saveItem.bind(this);
         this.setSelectedItem = this.setSelectedItem.bind(this);
         this.setToPrevious = this.setToPrevious.bind(this);
         this.undoItem = this.undoItem.bind(this);
         this.redoItem = this.redoItem.bind(this);
     }

    setSelectedItem (value) {
        const updatedState = {...this.state, selected:value};
        this.setState(updatedState);
    }

    setToPrevious(items){
        const {past} = this.state;
        this.setState({
            ...this.state,
            past:[...past, items]
        });
    }

    saveItem(items) {
        this.setState( {
            ...this.state,
            present: items
        });
    }

    undoItem(){
        const {past, present, future} = this.state;
        if( past.length <= 0) {
            return;
        }
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        this.setState({
            ...this.state,
            past: newPast,
            present: previous,
            future: [present, ...future]
        });
    }

    redoItem(){
        const {past, present, future} = this.state;
        if(future.length <= 0){
            return;
        }
        const next = future[0];
        const newFuture = future.slice(1);
        this.setState({
            ...this.state,
            past: [...past, present],
            present: next,
            future: newFuture
        });
    }

    render(){

        const formProps = {
            items:this.state.items,
            selected:this.state.selected,
            name:this.state.items[this.state.selected].name,
            fields: [...this.state.items[this.state.selected].fields],
            saveItem:this.saveItem,
            setToPrevious:this.setToPrevious
        };

        return (
        <div className="app">
          <Header
              title={this.state.title}
              undoItem={this.undoItem}
              redoItem={this.redoItem}
          />
          <List
              items={this.state.items}
              setSelectedItem={this.setSelectedItem}
              selected={this.state.selected}
          >
          </List>
          <FormContainer
                items={this.state.present}
                selected={this.state.selected}
                name={this.state.present[this.state.selected].name}
                fields={ [...this.state.present[this.state.selected].fields]}
                saveItem={this.saveItem}
                setToPrevious={this.setToPrevious}
          />
        </div>
      );
    }
}

export default App;
