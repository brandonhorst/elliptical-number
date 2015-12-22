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

  suppressWhen (input) {
    if (!/^[\-\+]?\d*$/.test(input)) return false

    if (this.props.min >= 0 && _.startsWith(input, '-')) return false
    if (this.props.max < 0 && !_.startsWith(input, '-')) return false

    const intValue = parseInt(input, 10) || 0

    if (this.props.max > 0 && intValue > this.props.max) return false
    if (this.props.min < 0 && intValue < this.props.min) return false
    
    return true
  }

  describe () {
    return (
      <map function={this.getValue.bind(this)}>
        <label text={this.props.argument} suppressWhen={this.suppressWhen.bind(this)}>
          <freetext filter={this.filter.bind(this)} limit={this.props.limit} splitOn={/\D/} score={1} />
        </label>
      </map>
    )
  }
}

Integer.defaultProps = {
  max: MAX_SAFE_INTEGER,
  min: -MAX_SAFE_INTEGER,
  argument: 'number'
}
