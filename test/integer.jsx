/** @jsx createElement */
/* eslint-env mocha */

import _ from 'lodash'
import {createElement, compile} from 'elliptical'
import Integer from '../src/integer'
import {expect} from 'chai'

describe('Integer', () => {
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

  describe('incomplete', () => {
    before(() => {
      parse = compile(<Integer />)
    })

    const testCases = [
      {input: '', placeholder: true},
      {input: '-', placeholder: true},
      {input: '+', placeholder: true},
      {input: '0', result: 0},
      {input: '-0', result: 0},
      {input: '+0', result: 0},
    ]

    _.forEach(testCases, test)
  })

  describe('default', () => {
    before(() => {
      parse = compile(<Integer allowWordForm />)
    })

    const testCases = [
      {input: '1', result: 1},
      {input: 'twenty-two', result: 22},
      {input: '-1', result: -1},
      {input: '123', result: 123},
      {input: '-123', result: -123},
      {input: '+123', result: 123},
      {input: '0', result: 0},
      {input: 'zero', result: 0},
      {input: '-0', result: 0},
      {input: 'f3', length: 0},
      {input: '-f3', length: 0},
      {input: '3f', length: 0},
      {input: '-3f', length: 0},
      {input: '3+', length: 0},
      {input: 'threeve', length: 0},
      {input: '3-', length: 0},
      {input: '3+3', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('handles an Integer with a min', () => {
    before(() => {
      parse = compile(<Integer min={50} />)
    })

    const testCases = [
      {input: '1', placeholder: true},
      {input: '49', placeholder: true},
      {input: '-1', length: 0},
      {input: '-51', length: 0},
      {input: '50', result: 50},
      {input: '61', result: 61},
      {input: '500', result: 500}
    ]

    _.forEach(testCases, test)
  })

  describe('handles an Integer with a max', () => {
    before(() => {
      parse = compile(<Integer max={50} />)
    })

    const testCases = [
      {input: '1', result: 1},
      {input: '50', result: 50},
      {input: '51', length: 0},
      {input: '-1', result: -1},
      {input: '-51', result: -51}
    ]

    _.forEach(testCases, test)
  })

  describe('handles an integer with a min and a max (both positive)', () => {
    before(() => {
      parse = compile(<Integer min={30} max={70} />)
    })

    const testCases = [
      {input: '1', placeholder: true},
      {input: '0', placeholder: true},
      {input: '8', placeholder: true}, //TODO this could be improved see below
      {input: '30', result: 30},
      {input: '50', result: 50},
      {input: '70', result: 70},
      {input: '71', length: 0},
      {input: '+50', result: 50},
      {input: '+70', result: 70},
      {input: '+71', length: 0},
      {input: '-0', length: 0},
      {input: '-1', length: 0},
      {input: '-51', length: 0},
      {input: '-71', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('handles an integer with a min and a max (both negative)', () => {
    before(() => {
      parse = compile(<Integer min={-70} max={-30} />)
    })

    const testCases = [
      {input: '-1', placeholder: true},
      {input: '-0', placeholder: true},
      {input: '-8', placeholder: true}, //TODO this could be improved see below
      {input: '-30', result: -30},
      {input: '-50', result: -50},
      {input: '-70', result: -70},
      {input: '-71', length: 0},
      {input: '0', length: 0},
      {input: '+0', length: 0},
      {input: '+1', length: 0},
      {input: '1', length: 0},
      {input: '51', length: 0},
      {input: '71', length: 0}
    ]

    _.forEach(testCases, test)
  })

  describe('handles an integer with a min and a max (straddling 0)', () => {
    before(() => {
      parse = compile(<Integer min={-50} max={50} />)
    })

    const testCases = [
      {input: '1', result: 1},
      {input: '-1', result: -1},
      {input: '-0', result: 0},
      {input: '0', result: 0},
      {input: '-30', result: -30},
      {input: '-50', result: -50},
      {input: '-70', length: 0},
      {input: '30', result: 30},
      {input: '50', result: 50},
      {input: '70', length: 0}
    ]

    _.forEach(testCases, test)
  })
})
