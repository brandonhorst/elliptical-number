/** @jsx createElement */

import _ from 'lodash'
import {createElement} from 'elliptical'

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

function getValue (option) {
  return _.assign({}, option, {result: parseInt(option.result, 10)})
}

function suppressWhen (input, props) {
  const intValue = parseInt(input, 10)

  if (pureNumber(input)) {
    if (intValue < props.max) return true
  } else if (incompleteOrdinal(input)) {
    if (intValue <= props.max && intValue >= props.min) return true
  }

  return false
}

const defaultProps = {
  min: 1,
  max: MAX_SAFE_INTEGER,
  argument: 'ordinal'
}

function filterResult (result, {props}) {
  return result <= props.max && result >= props.min
}

function describe ({props}) {
  return (
    <label
      text={props.argument}
      suppressWhen={(input) => suppressWhen(input, props)}
      suppressEmpty>
      <map outbound={getValue} skipIncomplete>
        <freetext
          filter={completeOrdinal}
          limit={props.limit}
          splitOn={/[^0-9stndhr]/}
          score={1} />
      </map>
    </label>
  )
}

export default {defaultProps, describe, filterResult}
