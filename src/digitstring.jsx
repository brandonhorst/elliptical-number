/** @jsx createElement */
import {createElement} from 'elliptical'
import _ from 'lodash'

function isNumeric (input) {
  return /^\d+$/.test(input)
}

function suppressWhen (input, props) {
  if (!isNumeric(input)) return false

  if (!props.allowLeadingZeros && input !== '0' && _.startsWith(input, '0')) return false

  if (input.length < props.minLength) return true

  const intValue = parseInt(input, 10)
  if (intValue < props.min) return true
  return false
}

const defaultProps = {
  minLength: 1,
  maxLength: 9007199254740991,
  min: 0,
  max: 9007199254740991,
  allowLeadingZeros: true,
  argument: 'digit string'
}

function filterResult (result, {props}) {
  if (result.length > props.maxLength) return false
  if (result.length < props.minLength) return false

  if (!props.allowLeadingZeros && result !== '0' && _.startsWith(result, '0')) return false

  const intValue = parseInt(result, 10)
  if (isNaN(intValue)) return false
  if (intValue > props.max) return false
  if (intValue < props.min) return false

  return true
}

function describe ({props}) {
  return (
    <placeholder
      text={props.argument}
      suppressWhen={(input) => suppressWhen(input, props)}
      suppressEmpty>
      <freetext filter={isNumeric} splitOn={/\D/} score={1} />
    </placeholder>
  )
}

export default {defaultProps, filterResult, describe}