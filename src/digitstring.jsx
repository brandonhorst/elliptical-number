/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
import _ from 'lodash'

export default class DigitString {
  filter (input) {
    if (!/^[0-9]+$/.test(input)) return false

    if (input.length > this.props.maxLength) return false
    if (input.length < this.props.minLength) return false

    if (!this.props.allowLeadingZeros && input !== '0' && input.search(/^0/) !== -1) return false

    if (!_.isUndefined(this.props.max) || !_.isUndefined(this.props.min)) {
      const intValue = parseInt(input, 10)
      if (isNaN(intValue)) return false
      if (intValue > this.props.max) return false
      if (intValue < this.props.min) return false
    }

    return true
  }

  displayWhen (input) {
    if (!/^\d*$/.test(input)) return false

    if (input.length > this.props.maxLength) return false
    if (!this.props.allowLeadingZeros && input !== '0' && /^0/.test(input)) return false

    const intValue = parseInt(input, 10)
    if (intValue > this.props.max) return false

    return true
  }

  describe () {
    if (this.props.descriptor) {
      return (
        <placeholder text={this.props.descriptor} displayWhen={this.displayWhen.bind(this)}>
          <freetext validate={this.filter.bind(this)} splitOn={/\D/} score={1} />
        </placeholder>
      )
    } else {
      return <freetext validate={this.filter.bind(this)} splitOn={/\D/} score={1} />
    }
  }
}
DigitString.defaultProps = {
  minLength: 0,
  maxLength: 9007199254740991,
  min: 0,
  max: 9007199254740991,
  allowLeadingZeros: true
}
