/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
var FontAwesome = require('react-fontawesome');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      tasks : []
    };
    this.addTask = this.addTask.bind(this);
  }

  addTask(event) {
    if (event && (event.which == 13 || event.keyCode == 13)) {
      let newTask = {
        name: event.target.value,
        strike: false
      };
      let tasks = this.state.tasks;
      tasks.push(newTask);
      this.setState({tasks: tasks});
      event.target.value = "";
    }
  }

  strikeTask(index) {
    let tasks = this.state.tasks;
    tasks[index].strike = ! tasks[index].strike;
    console.log(tasks[index].strike);
    this.setState({tasks: tasks});
  }

  removeTask(index) {
    let tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({tasks: tasks});
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.task_create).focus();
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.task_create).focus();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <input ref="task_create" type="text" className={s.taskCreate} placeholder="Type your task and press enter" onKeyPress={this.addTask}/>
          <div className={s.taskList}>
            {this.state.tasks.map((item, index) => (
              <div key={index} className={s.taskItem}>
                <span className={item.strike ? s.strike : ''}>{item.name}</span>
                <div className={s.taskRight}>
                  <FontAwesome name='check-square-o' onClick={() => this.strikeTask(index)} />
                  <FontAwesome name='trash-o' onClick={() => this.removeTask(index)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};

export default withStyles(Home, s);
