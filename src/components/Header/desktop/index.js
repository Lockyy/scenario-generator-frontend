import React, { Component } from 'react'
import Radium               from 'radium';
import { Link }             from 'react-router';

import ENV from '../../../../env'

import Styles                from './styles'
import StyleConstants        from '../../../constants/styles/css'
import Icons                 from '../../../constants/images/icons'
import rerollScenario        from '../../../utils/rerollScenario'
import getScenarioActionHash from '../../../utils/scenarioActionHash'
import Button                from '../../Button'
import Strings               from '../../../constants/strings'

export default Radium(class DesktopHeader extends Component {
  onSave() {
    this.setState({ changed: false })
    this.props.subscribeActions.createSubscription(this.state.email)
  }

  onChange(event) {
    this.setState({email: event.target.value, changed: true });
  }

  renderTitle() {
    return (
      <span style={[Styles.titleContainer, StyleConstants.desktop]}>
        <Link
          to={`/`}
          style={Styles.title}>
          {Strings.headerTitle} - {this.props.title}
        </Link>
      </span>
    )
  }

  renderSubscribeMessages() {
    if(this.state.changed) { return }
    if(this.props.subscribed) {
      return <div style={Styles.errors}>Subscribed!</div>
    }
    return (
      <div style={Styles.errors}>
        {
          _.map(this.props.errors, function(error) {
            return error
          })
        }
      </div>
    )
  }

  renderSubscribeForm() {
    return (
      <span style={Styles.subscription}>
        {this.renderSubscribeMessages()}
        <input
          type="text"
          value={this.state.email}
          onChange={this.onChange.bind(this)}
          style={[StyleConstants.forms.input, StyleConstants.forms.inputWithButton, Styles.input]}
          placeholder={Strings.subscribe.placeholder}
        />
        <Button
          color={'green'}
          onClick={this.onSave.bind(this)}
          attached>
          {Strings.buttons.subscribeHeader}
        </Button>
      </span>
    )
  }

  renderEmailButton() {
    return (
      <span style={Styles.emailButton}>
        <Button
          color={'orange'}
          href={`mailto:${ENV.email}`}>
          {Strings.buttons.suggestion}
        </Button>
      </span>
    )
  }

  renderSpinner() {
    if(this.props.isFetching) {
      return (
        <span>
          <img
            src={Icons.spinner}
            style={Styles.icon}
          />
        </span>
      )
    }
  }

  render() {
    return (
      <div style={[Styles.container, StyleConstants.desktop]}>
        <span style={Styles.titleSpinnerContainer}>
          {this.renderTitle()}
          {this.renderSpinner()}
        </span>
        <span style={Styles.right}>
          {this.renderSubscribeForm()}
          {this.renderEmailButton()}
        </span>
      </div>
    )
  }
})
