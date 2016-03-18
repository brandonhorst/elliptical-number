/** @jsx createElement */

import _ from 'lodash'
import {createElement} from 'elliptical'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

function isSignedDecimal (input) {
  return /^[\-\+]?(\d+(\.\d*)?|\.\d+)$/.test(input)
}

function parseDecimal (string) {
  const parts = string.split('.')
  let num = 0
  if (parts[0] !== '' && parts[0] !== '-' && parts[0] !== '+') {
    num = parseInt(parts[0], 10)
  }
  if (parts.length > 1 && parts[1].length > 0) {
      const frac = parseInt(parts[1], 10) / Math.pow(10, parts[1].length)
      num += _.startsWith(parts[0], '-') ? -frac : frac
  }

  return num
}

function getValue (option) {
  return _.assign({}, option, {result: parseDecimal(option.result)})
}

function suppressWhen (input, props) {
  if (input === '-' || input === '+' || input === '.' ||
    input === '-.' || input === '+.') return true
  if (!isSignedDecimal(input)) return false

  const numValue = parseDecimal(input)

  if (props.min >= 0) {
    if (_.startsWith(input, '-')) return false
    if (numValue < 0) return false
    if (numValue > props.max) return false
    if (numValue < props.min) return true
  } else if (props.max <= 0) {
    if (!_.startsWith(input, '-')) return false
    if (numValue > 0) return false
    if (numValue < props.min) return false
    if (numValue > props.max) return true
  }

  return false
}

const defaultProps = {
  max: MAX_SAFE_INTEGER,
  min: -MAX_SAFE_INTEGER,
  argument: 'decimal',
  limit: 1
}

function filterResult (result, {props}) {
  return result <= props.max && result >= props.min
}

function describe ({props}) {
  return (
    <label text={props.argument}
      suppressWhen={(input) => suppressWhen(input, props)}>
      <map outbound={getValue}>
        <freetext filter={isSignedDecimal} limit={props.limit}
          splitOn={/[^\d\.]/} score={1} />
      </map>
    </label>
  )
}

export default {defaultProps, describe, filterResult}