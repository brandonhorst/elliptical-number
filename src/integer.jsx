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
  label: 'integer',
  allowWordForm: false,
  allowIndefiniteArticles: false
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
      <choice>
        <map outbound={getValue} skipIncomplete>
          <freetext filter={isSignedNumeric} limit={props.limit} splitOn={/\D/} score={1} />
        </map>
        {props.allowWordForm ? <list items={[
          {text: 'zero', value: 0},
          {text: 'one', value: 1},
          {text: 'two', value: 2},
          {text: 'three', value: 3},
          {text: 'four', value: 4},
          {text: 'five', value: 5},
          {text: 'six', value: 6},
          {text: 'seven', value: 7},
          {text: 'eight', value: 8},
          {text: 'nine', value: 9},
          {text: 'ten', value: 10},
          {text: 'eleven', value: 11},
          {text: 'twelve', value: 12},
          {text: 'thirteen', value: 13},
          {text: 'fourteen', value: 14},
          {text: 'fifteen', value: 15},
          {text: 'sixteen', value: 16},
          {text: 'seventeen', value: 17},
          {text: 'eighteen', value: 18},
          {text: 'nineteen', value: 19},
          {text: 'twenty', value: 20},
          {text: 'twenty-one', value: 21},
          {text: 'twenty-two', value: 22},
          {text: 'twenty-three', value: 23},
          {text: 'twenty-four', value: 24},
          {text: 'twenty-five', value: 25},
          {text: 'twenty-six', value: 26},
          {text: 'twenty-seven', value: 27},
          {text: 'twenty-eight', value: 28},
          {text: 'twenty-nine', value: 29},
          {text: 'thirty', value: 30},
          {text: 'thirty-one', value: 31}
        ]} /> : null}
        {props.allowIndefiniteArticles ? <list items={[
          {text: 'a', value: 1},
          {text: 'an', value: 1}
        ]} /> : null}
      </choice>
    </placeholder>
  )
}

export default {defaultProps, filterResult, describe}