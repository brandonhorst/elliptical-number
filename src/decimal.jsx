/** @jsx createElement */

import _ from 'lodash'
import { createElement, Phrase } from 'lacona-phrase';

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

function isSignedDecimal (input) {
  return /^[\-\+]?(\d+(\.\d*)?|\.\d+)$/.test(input)
}

export default class Decimal extends Phrase {
  static defaultProps = {
    max: MAX_SAFE_INTEGER,
    min: -MAX_SAFE_INTEGER,
    argument: 'number'
  }

  getValue (result) {
    if (_.isUndefined(result)) return

    const parts = result.split('.')
    let num = 0
    if (parts[0] !== '' && parts[0] !== '-' && parts[0] !== '+') {
      num = parseInt(parts[0], 10)
    }
    if (parts.length > 1 && parts[1].length > 0) {
        const frac = parseInt(parts[1], 10) / Math.pow(10, parts[1].length)
        num += _.startsWith(parts[0], '-')? -frac: frac
    }
    return num
  }

  validate (result) {
    return result <= this.props.max && result >= this.props.min
  }

  suppressWhen (input) {
    if (input === '-' || input === '+' || input === '.'
        || input === '-.' || input === '+.') return true
    if (!isSignedDecimal(input)) return false

    const numValue = this.getValue(input)

    if (this.props.min >= 0) {
      if (_.startsWith(input, '-')) return false
      if (numValue < 0) return false
      if (numValue > this.props.max) return false
      if (numValue < this.props.min) return true
    } else if (this.props.max <= 0) {
      if (!_.startsWith(input, '-')) return false
      if (numValue > 0) return false
      if (numValue < this.props.min) return false
      if (numValue > this.props.max) return true
    }

    return false
  }

  describe () {
    return (
      <label text={this.props.argument} suppressWhen={this.suppressWhen.bind(this)} suppressEmpty>
        <map function={this.getValue.bind(this)}>
          <freetext filter={isSignedDecimal} limit={this.props.limit} splitOn={/[^\d\.]/} score={1} />
        </map>
      </label>
    )
  }
}

