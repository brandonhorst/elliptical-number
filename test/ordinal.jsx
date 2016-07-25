/** @jsx createElement */
/* eslint-env mocha */

import _ from 'lodash'
import {createElement, compile} from 'elliptical'
import Ordinal from '../src/ordinal'
import {expect} from 'chai'

function text(input) {
  return _.map(input.words, 'text').join('')
}

describe('Ordinal', () => {
  let parse
  function test({input, text, placeholder, result, length = 1}) {
    if (text == null)  {
      text = placeholder ? undefined : input
    }

    it(input, () => {
      const data = parse(input)
      expect(data, input).to.have.length(length)
      if (length >= 1) {
        expect(data[0].words[0].text, input).to.equal(text)
        expect(data[0].result, input).to.equal(result)
        expect(data[0].words[0].placeholder, input).to.equal(placeholder)
      }
    })
  }

  describe('default', () => {
    beforeEach(() => {
      parse = compile(<Ordinal allowWordForm />)
    })

    const testCases = [
      {input: '0', length: 0},
      {input: '01', length: 0},
      {input: '01s', length: 0},
      {input: '01st', length: 0},
      {input: '1', placeholder: true},
      {input: '145', placeholder: true},
      {input: '1s', placeholder: true},
      {input: '1s', placeholder: true},
      {input: '2n', placeholder: true},
      {input: '3r', placeholder: true},
      {input: '4t', placeholder: true},
      {input: '4n', length: 0},
      {input: '4s', length: 0},
      {input: '4r', length: 0},
      {input: '1st', result: 1},
      {input: '2nd', result: 2},
      {input: '3rd', result: 3},
      {input: '4th', result: 4},
      {input: 'fourth', result: 4},
      {input: '11th', result: 11},
      {input: '12th', result: 12},
      {input: '13th', result: 13},
      {input: '14th', result: 14},
      {input: '123rd', result: 123},
      {input: '123f', length: 0},
      {input: 'threeve', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('min', () => {
    before(() => {
      parse = compile(<Ordinal allowWordForm min={5} />)
    })

    const testCases = [
      {input: '1', placeholder: true},
      {input: '1s', length: 0},
      {input: '1st', length: 0},
      {input: 'first', length: 0},
      {input: '4th', length: 0},
      {input: '5th', result: 5},
      {input: 'fifth', result: 5},
      {input: '6th', result: 6},
      {input: '36th', result: 36}
    ]

    _.forEach(testCases, test)
  })

  describe('max', () => {
    before(() => {
      parse = compile(<Ordinal allowWordForm max={5} />)
    })

    const testCases = [
      {input: '1st', result: 1},
      {input: '4th', result: 4},
      {input: '5th', result: 5},
      {input: 'fifth', result: 5},
      {input: '6', length: 0},
      {input: '6t', length: 0},
      {input: '6th', length: 0},
      {input: 'sixth', length: 0},
      {input: '15', length: 0},
      {input: '15t', length: 0},
      {input: '15th', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('min/max', () => {
    before(() => {
      parse = compile(<Ordinal allowWordForm min={3} max={7} />)
    })

    const testCases = [
      {input: '1', placeholder: true}, // TODO
      {input: '1s', length: 0},
      {input: 'first', length: 0},
      {input: '2nd', length: 0},
      {input: '3rd', result: 3},
      {input: '6th', result: 6},
      {input: 'sixth', result: 6},
      {input: '7th', result: 7},
      {input: '8th', length: 0},
      {input: 'eigth', length: 0},
      {input: '89', length: 0}
    ]

    _.forEach(testCases, test)
  })
})
