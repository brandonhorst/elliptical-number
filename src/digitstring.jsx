/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
import _ from 'lodash'

function isNumeric (input) {
  return /^\d+$/.test(input)
}

export default class DigitString extends Phrase {
  static defaultProps = {
    minLength: 1,
    maxLength: 9007199254740991,
    min: 0,
    max: 9007199254740991,
    allowLeadingZeros: true,
    argument: 'number'
  }

  validate (result) {
    if (result.length > this.props.maxLength) return false
    if (result.length < this.props.minLength) return false

    if (!this.props.allowLeadingZeros && result !== '0' && _.startsWith(result, '0')) return false

    const intValue = parseInt(result, 10)
    if (isNaN(intValue)) return false
    if (intValue > this.props.max) return false
    if (intValue < this.props.min) return false

    return true
  }

  suppressWhen (input) {
    if (!isNumeric(input)) return false

    if (!this.props.allowLeadingZeros && input !== '0' && _.startsWith(input, '0')) return false

    if (input.length < this.props.minLength) return true

    const intValue = parseInt(input, 10)
    if (intValue < this.props.min) return true
    //
    // const lowestOneMoreDigit = `${input}0`
    // if (lowestOneMoreDigit.length > this.props.maxLength) return false
    //
    // const lowestOneMoreDigitIntValue = parseInt(lowestOneMoreDigit, 10)
    // if (lowestOneMoreDigitIntValue > this.props.max) return false
    //
    return false
  }

  describe () {
    return (
      <label text={this.props.argument} suppressWhen={this.suppressWhen.bind(this)} suppressEmpty>
        <freetext filter={isNumeric} splitOn={/\D/} score={1} />
      </label>
    )
  }
}
