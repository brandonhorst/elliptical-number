/** @jsx createElement */
/* eslint-env mocha */

import _ from 'lodash'
import {createElement, Phrase} from 'lacona-phrase'
import {Ordinal} from '..'
import {expect} from 'chai'
import {Parser} from 'lacona'

function text(input) {
  return _.map(input.words, 'text').join('')
}

describe('Ordinal', () => {
  let parser, data

  beforeEach(() => {
    parser = new Parser()
  })

  it('handles an Ordinal with no min/max', () => {
    parser.grammar = <Ordinal />

    data = parser.parseArray('1st')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('1st')
    expect(data[0].result).to.equal(1)

    data = parser.parseArray('123rd')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('123rd')
    expect(data[0].result).to.equal(123)

    data = parser.parseArray('123f')
    expect(data).to.have.length(0)
  })

  it('handles an Ordinal with a min', () => {
    parser.grammar = <Ordinal min={5} />

    data = parser.parseArray('7th')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('7th')
    expect(data[0].result).to.equal(7)

    data = parser.parseArray('5th')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('5th')
    expect(data[0].result).to.equal(5)

    data = parser.parseArray('3rd')
    expect(data).to.have.length(0)
  })

  it('handles an Ordinal with a max', () => {
    parser.grammar = <Ordinal max={5} />

    data = parser.parseArray('3rd')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('3rd')
    expect(data[0].result).to.equal(3)

    data = parser.parseArray('5th')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('5th')
    expect(data[0].result).to.equal(5)

    data = parser.parseArray('7th')
    expect(data).to.have.length(0)
  })

  it('handles an integer with a min and a max', () => {
    parser.grammar = <Ordinal min={30} max={70} />

    data = parser.parseArray('30th')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('30th')
    expect(data[0].result).to.equal(30)

    data = parser.parseArray('3')
    expect(text(data[0])).to.equal('nth')
    expect(data[0].words[0].placeholder).to.be.true
    expect(data).to.have.length(1)

    data = parser.parseArray('40th')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('40th')
    expect(data[0].result).to.equal(40)

    data = parser.parseArray('70th')
    expect(data).to.have.length(1)
    expect(text(data[0])).to.equal('70th')
    expect(data[0].result).to.equal(70)

    data = parser.parseArray('600th')
    expect(data).to.have.length(0)
  })
})
