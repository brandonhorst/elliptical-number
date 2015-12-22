/** @jsx createElement */
/* eslint-env mocha */

import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'
import {Integer} from '..'
import {expect} from 'chai'
import {Parser} from 'lacona'

function text(input) {
  return _.map(input.words, 'text').join('')
}

describe('Integer', () => {
  let parser, data

  beforeEach(() => {
    parser = new Parser()
  })

  it('handles an integer with no min/max', () => {
    parser.grammar = <Integer />

    data = parser.parseArray('1')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('1')
    expect(data[0].result).to.equal(1)

    data = parser.parseArray('123')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('123')
    expect(data[0].result).to.equal(123)

    data = parser.parseArray('123f')
    expect(data).to.have.length(0)
  })

  it('handles an Integer with a min', () => {
    parser.grammar = <Integer min={5} />

    data = parser.parseArray('7')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('7')
    expect(data[0].result).to.equal(7)

    data = parser.parseArray('5')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('5')
    expect(data[0].result).to.equal(5)

    data = parser.parseArray('3')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('number')
    expect(data[0].words[0].placeholder).to.be.true
  })

  it('handles an Integer with a max', () => {
    parser.grammar = <Integer max={5} />

    data = parser.parseArray('3')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('3')
    expect(data[0].result).to.equal(3)

    data = parser.parseArray('5')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('5')
    expect(data[0].result).to.equal(5)

    data = parser.parseArray('7')
    expect(data).to.have.length(0)
  })

  it('handles an integer with a min and a max', () => {
    parser.grammar = <Integer min={30} max={70} />

    data = parser.parseArray('2')
    // TODO if we were being really good, this would return no resuts.
    // There is no combination of characters that you can enter after 2
    // that would make this a valid input. 29 is too low, 200 is too high.
    // however, this behavior is fine for now
    expect(text(data[0])).to.equal('number')
    expect(data[0].words[0].placeholder).to.be.true
    expect(data).to.have.length(1)

    data = parser.parseArray('3')
    expect(text(data[0])).to.equal('number')
    expect(data[0].words[0].placeholder).to.be.true
    expect(data).to.have.length(1)

    data = parser.parseArray('40')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('40')
    expect(data[0].result).to.equal(40)

    data = parser.parseArray('70')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('70')
    expect(data[0].result).to.equal(70)

    data = parser.parseArray('600')
    expect(data).to.have.length(0)
  })
})
