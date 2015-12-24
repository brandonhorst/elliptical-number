/** @jsx createElement */

import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

function isSignedNumeric (input) {
  return /^[\-\+]?\d+$/.test(input)
}

export default class Integer extends Phrase {
  static defaultProps = {
    max: MAX_SAFE_INTEGER,
    min: -MAX_SAFE_INTEGER,
    argument: 'number'
  }
  
  getValue (result) {
    if (_.isUndefined(result)) return
    return parseInt(result, 10)
  }

  validate (result) {
    return result <= this.props.max && result >= this.props.min
  }

  suppressWhen (input) {
    if (input === '-' || input === '+') return true
    if (!isSignedNumeric(input)) return false

    const intValue = parseInt(input, 10)

    if (this.props.min >= 0) {
      if (_.startsWith(input, '-')) return false
      if (intValue < 0) return false
      if (intValue > this.props.max) return false
      if (intValue < this.props.min) return true
    } else if (this.props.max <= 0) {
      if (!_.startsWith(input, '-')) return false
      if (intValue > 0) return false
      if (intValue < this.props.min) return false
      if (intValue > this.props.max) return true
    }

    return false
  }

  describe () {
    return (
      <label text={this.props.argument} suppressWhen={this.suppressWhen.bind(this)} suppressEmpty>
        <map function={this.getValue.bind(this)}>
          <freetext filter={isSignedNumeric} limit={this.props.limit} splitOn={/\D/} score={1} />
        </map>
      </label>
    )
  }
}
