/** @jsx createElement */

import _ from 'lodash'
import {createElement} from 'elliptical'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

function isSignedNumeric (input) {
  return /^[\-\+]?\d+$/.test(input)
}
  
function getValue (option) {
  return _.assign({}, option, {result: parseInt(option.result, 10)})
}

function suppressWhen (input, props) {
  if (input === '-' || input === '+') return true
  if (!isSignedNumeric(input)) return false

  const intValue = parseInt(input, 10)

  if (props.min >= 0) {
    if (_.startsWith(input, '-')) return false
    if (intValue < 0) return false
    if (intValue > props.max) return false
    if (intValue < props.min) return true
  } else if (props.max <= 0) {
    if (!_.startsWith(input, '-')) return false
    if (intValue > 0) return false
    if (intValue < props.min) return false
    if (intValue > props.max) return true
  }

  return false
}

const defaultProps = {
  max: MAX_SAFE_INTEGER,
  min: -MAX_SAFE_INTEGER,
  argument: 'integer',
  limit: 1
}

function filterResult (result, {props}) {
  return result <= props.max && result >= props.min
}

function describe ({props}) {
  return (
    <label text={props.argument}
      suppressWhen={(input) => suppressWhen(input, props)} suppressEmpty>
      <map outbound={getValue} skipIncomplete>
        <freetext filter={isSignedNumeric} limit={props.limit} splitOn={/\D/} score={1} />
      </map>
    </label>
  )
}

export default {defaultProps, filterResult, describe}