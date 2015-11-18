/** @jsx createElement */
import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

export default class Ordinal extends Phrase {
  getValue (result) {
    if (_.isUndefined(result)) return
    return parseInt(result, 10)
  }

  validate (input) {
    if (!/^(?:\d+th|\d*1st|\d*2nd|\d*3rd)$/.test(input)) return false

    const number = parseInt(input, 10)
    return number <= this.props.max && number >= this.props.min
  }

  displayWhen (input) {
    if (!/^(?:\d*|\d*t|\d*1s|\d*2n|\d*3r)$/.test(input)) return false

    const number = parseInt(input, 10) || 1
    return number <= this.props.max
  }

  describe () {
    return (
      <placeholder text={this.props.descriptor} displayWhen={this.displayWhen.bind(this)}>
        <freetext validate={this.validate.bind(this)} limit={this.props.limit} splitOn={/[ ,]/} score={1} />
      </placeholder>
    )
  }
}

Ordinal.defaultProps = {
  max: MAX_SAFE_INTEGER,
  min: 1,
  descriptor: 'nth'
}
