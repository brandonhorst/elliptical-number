/** @jsx createElement */
/* eslint-env mocha */

import _ from 'lodash'
import { createElement, Phrase } from 'lacona-phrase'
import { DigitString } from '..'
import { expect } from 'chai'
import { Parser } from 'lacona'

function text(input) {
  return _.map(input.words, 'text').join('')
}

describe('DigitString', () => {
  let parser

  before(() => {
    parser = new Parser()
  })

  function test({input, text, placeholder, result, length = 1}) {
    if (text == null)  {
      text = placeholder ? 'number' : input
    }
    if (result == null) {
      result = placeholder ? undefined : text
    }

    it(input, () => {
      const data = parser.parseArray(input)
      expect(data, input).to.have.length(length)
      if (length >= 1) {
        expect(data[0].words[0].text, input).to.equal(text)
        expect(data[0].words[0].placeholder, input).to.equal(placeholder)
        expect(data[0].result, input).to.equal(result)
      }
    })
  }

  describe('default', () => {
    before(() => {
      parser.grammar = <DigitString />
    })

    const testCases = [
      {input: '', placeholder: true},
      {input: '0'},
      {input: '1'},
      {input: '01'},
      {input: '123'},
      {input: '-123', length: 0},
      {input: '+123', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('min', () => {
    before(() => {
      parser.grammar = <DigitString min={50} />
    })

    const testCases = [
      {input: '0', placeholder: true},
      {input: '1', placeholder: true},
      {input: '01', placeholder: true},
      {input: '049', placeholder: true},
      {input: '49', placeholder: true},
      {input: '50'},
      {input: '51'},
      {input: '490'},
      {input: '0051'}
    ]

    _.forEach(testCases, test)
  })

  describe('max', () => {
    before(() => {
      parser.grammar = <DigitString max={50} />
    })

    const testCases = [
      {input: '0'},
      {input: '1'},
      {input: '01'},
      {input: '049'},
      {input: '50'},
      {input: '51', length: 0},
      {input: '490', length: 0},
      {input: '0051', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('min/max', () => {
    before(() => {
      parser.grammar = <DigitString min={30} max={70} />
    })

    const testCases = [
      {input: '0', placeholder: true},
      {input: '1', placeholder: true},
      {input: '8', placeholder: true}, // TODO
      {input: '01', placeholder: true},
      {input: '029', placeholder: true},
      {input: '30'},
      {input: '50'},
      {input: '70'},
      {input: '71', length: 0},
      {input: '0090', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('minLength', () => {
    before(() => {
      parser.grammar = <DigitString minLength={2} />
    })

    const testCases = [
      {input: '0', placeholder: true},
      {input: '1', placeholder: true},
      {input: '00'},
      {input: '01'},
      {input: '029'},
      {input: '222'}
    ]

    _.forEach(testCases, test)
  })

  describe('maxLength', () => {
    before(() => {
      parser.grammar = <DigitString maxLength={3} />
    })

    const testCases = [
      {input: '0'},
      {input: '1'},
      {input: '00'},
      {input: '01'},
      {input: '029'},
      {input: '222'},
      {input: '0294', length: 0},
      {input: '1294', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('minLength/maxLength', () => {
    before(() => {
      parser.grammar = <DigitString minLength={2} maxLength={4} />
    })

    const testCases = [
      {input: '0', placeholder: true},
      {input: '1', placeholder: true},
      {input: '00'},
      {input: '01'},
      {input: '029'},
      {input: '0294'},
      {input: '1294'},
      {input: '12940', length: 0},
      {input: '02941', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('min/max/minLength/maxLength', () => {
    before(() => {
      parser.grammar = <DigitString minLength={3} maxLength={5} min={50} max={8000} />
    })

    const testCases = [
      {input: '0', placeholder: true},
      {input: '1', placeholder: true},
      {input: '00', placeholder: true},
      {input: '40', placeholder: true},
      {input: '40', placeholder: true},
      {input: '60', placeholder: true},
      {input: '060'},
      {input: '600'},
      {input: '6000'},
      {input: '8000'},
      {input: '06000'},
      {input: '9000', length: 0},
      {input: '16000', length: 0},
      {input: '006000', length: 0},
    ]

    _.forEach(testCases, test)
  })

  describe('allowLeadingZeros', () => {
    before(() => {
      parser.grammar = <DigitString allowLeadingZeros={false} />
    })

    const testCases = [
      {input: '0'},
      {input: '00', length: 0},
      {input: '01', length: 0},
      {input: '10'}
    ]

    _.forEach(testCases, test)
  })
})
