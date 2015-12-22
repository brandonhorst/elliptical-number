/** @jsx createElement */
import {createElement, Phrase} from 'lacona-phrase'
import _ from 'lodash'

export default class DigitString extends Phrase {
  filter (input) {
    if (!/^[0-9]+$/.test(input)) return false

    if (input.length > this.props.maxLength) return false
    if (input.length < this.props.minLength) return false

    if (!this.props.allowLeadingZeros && input !== '0' && _.startsWith(input, '0')) return false

    const intValue = parseInt(input, 10)
    if (isNaN(intValue)) return false
    if (intValue > this.props.max) return false
    if (intValue < this.props.min) return false

    return true
  }

  suppressWhen (input) {
    if (!/^\d*$/.test(input)) return false

    if (input.length > this.props.maxLength) return false
    if (!this.props.allowLeadingZeros && input !== '0' && _.startsWith(input, '0')) return false

    const intValue = parseInt(input, 10)
    if (intValue > this.props.max) return false

    const lowestOneMoreDigit = `${input}0`
    if (lowestOneMoreDigit.length > this.props.maxLength) return false
    
    const lowestOneMoreDigitIntValue = parseInt(lowestOneMoreDigit, 10)
    if (lowestOneMoreDigitIntValue > this.props.max) return false

    return true
  }

  describe () {
    return (
      <label text={this.props.argument} suppressWhen={this.suppressWhen.bind(this)}>
        <freetext filter={this.filter.bind(this)} splitOn={/\D/} score={1} />
      </label>
    )
  }
}
DigitString.defaultProps = {
  minLength: 0,
  maxLength: 9007199254740991,
  min: 0,
  max: 9007199254740991,
  allowLeadingZeros: true,
  argument: 'number'
}
