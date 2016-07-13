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
  limit: 1,
  label: 'integer'
}

function filterResult (result, {props}) {
  return result <= props.max && result >= props.min
}

function describe ({props}) {
  return (
    <placeholder label={props.label}
      arguments={props.phraseArguments || (props.phraseArguments ? [props.phraseArgument] : [props.label])}
      suppressWhen={(input) => suppressWhen(input, props)}
      suppressEmpty>
      <map outbound={getValue} skipIncomplete>
        <freetext filter={isSignedNumeric} limit={props.limit} splitOn={/\D/} score={1} />
      </map>
    </placeholder>
  )
}

export default {defaultProps, filterResult, describe}