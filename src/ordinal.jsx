/** @jsx createElement */
import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

function pureNumber (input) {
  return /^[1-9]\d*$/.test(input)
}

function incompleteOrdinal (input) {
  if (_.startsWith(input, '0')) return false
  return /^(?:\d+t|\d*1s|\d*2n|\d*3r)$/.test(input)
}

function completeOrdinal (input) {
  if (_.startsWith(input, '0')) return false
  return /^(?:\d+th|\d+t|\d*1st|\d*2nd|\d*3rd)$/.test(input)
}

export default class Ordinal extends Phrase {
  static defaultProps = {
    max: MAX_SAFE_INTEGER,
    min: 1,
    argument: 'number'
  }

  getValue (result) {
    return parseInt(result, 10)
  }

  validate (result) {
    return result <= this.props.max && result >= this.props.min
  }

  filter (input) {
    return completeOrdinal(input)
  }

  suppressWhen (input) {
    const intValue = parseInt(input, 10)

    if (pureNumber(input)) {
      if (intValue < this.props.max) return true
    } else if (incompleteOrdinal(input)) {
      if (intValue <= this.props.max && intValue >= this.props.min) return true
    }

    return false
  }

  describe () {
    return (
      <label text={this.props.argument} suppressWhen={this.suppressWhen.bind(this)} suppressEmpty>
        <map function={this.getValue.bind(this)}>
          <freetext filter={completeOrdinal} limit={this.props.limit} splitOn={/[^0-9stndhr]/} score={1} />
        </map>
      </label>
    )
  }
}
