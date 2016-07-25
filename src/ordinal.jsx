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
  label: 'ordinal'
}

function filterResult (result, {props}) {
  return result <= props.max && result >= props.min
}

function describe ({props}) {
  return (
    <placeholder
      label={props.label}
      arguments={props.phraseArguments || (props.phraseArguments ? [props.phraseArgument] : [props.label])}
      suppressWhen={(input) => suppressWhen(input, props)}
      suppressEmpty>
      <choice>
        <map outbound={getValue} skipIncomplete>
          <freetext
            filter={completeOrdinal}
            limit={props.limit}
            splitOn={/[^0-9stndhr]/}
            score={1} />
        </map>
        <list items={[
          {text: 'first', value: 1},
          {text: 'second', value: 2},
          {text: 'third', value: 3},
          {text: 'fourth', value: 4},
          {text: 'fifth', value: 5},
          {text: 'sixth', value: 6},
          {text: 'seventh', value: 7},
          {text: 'eighth', value: 8},
          {text: 'ninth', value: 9},
          {text: 'tenth', value: 10},
          {text: 'eleventh', value: 11},
          {text: 'twelvth', value: 12},
          {text: 'thirteenth', value: 13},
          {text: 'fourteenth', value: 14},
          {text: 'fifteenth', value: 15},
          {text: 'sixteenth', value: 16},
          {text: 'seventeenth', value: 17},
          {text: 'eighteenth', value: 18},
          {text: 'ninteenth', value: 19},
          {text: 'twentieth', value: 20},
          {text: 'twenty-first', value: 21},
          {text: 'twenty-second', value: 22},
          {text: 'twenty-third', value: 23},
          {text: 'twenty-fourth', value: 24},
          {text: 'twenty-fifth', value: 25},
          {text: 'twenty-sixth', value: 26},
          {text: 'twenty-seventh', value: 27},
          {text: 'twenty-eighth', value: 28},
          {text: 'twenty-ninth', value: 29},
          {text: 'thirtieth', value: 30},
          {text: 'thirty-first', value: 31}
        ]} />
      </choice>
    </placeholder>
  )
}

export default {defaultProps, describe, filterResult}
