/** @jsx createElement */
import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

export default class Integer extends Phrase {
  getValue (result) {
    if (_.isUndefined(result)) return
    return parseInt(result, 10)
  }

  filter (input) {
    if (!/^[\-\+]?\d+$/.test(input)) return false

    const number = parseInt(input, 10)
    return number <= this.props.max && number >= this.props.min
  }

  displayWhen (input) {
    if (!/^[\-\+]?\d*$/.test(input)) return false

    const number = parseInt(input, 10) || 0
    if (this.props.min >= 0) {
      if (_.startsWith(input, '-')) return false

      return number <= this.props.max
    } else if (this.props.max <= 0) {
      return number >= this.props.min
    } else {
      return number <= this.props.max && number >= this.props.min
    }
  }

  describe () {
    return (
      <placeholder text={this.props.descriptor} displayWhen={this.displayWhen.bind(this)}>
        <freetext validate={this.filter.bind(this)} limit={this.props.limit} splitOn={/\D/} score={1} />
      </placeholder>
    )
  }
}

Integer.defaultProps = {
  max: MAX_SAFE_INTEGER,
  min: -MAX_SAFE_INTEGER,
  descriptor: 'number'
}
