/** @jsx createElement */
/* eslint-env mocha */

import {createElement, Phrase} from 'lacona-phrase'
import {DigitString} from '..'
import {expect} from 'chai'
import fulltext from 'lacona-util-fulltext'
import {Parser} from 'lacona'

describe('DigitString', () => {
  let parser, data

  beforeEach(() => {
    parser = new Parser()
  })

  it('handles a digit string with no min/max', () => {
    parser.grammar = <DigitString />

    data = parser.parseArray('123')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('123')
    expect(data[0].result).to.equal('123')

    data = parser.parseArray('123f')
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a min', () => {
    parser.grammar = <DigitString min={5} />

    data = parser.parseArray('7')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('7')
    expect(data[0].result).to.equal('7')

    data = parser.parseArray('5')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal('5')

    data = parser.parseArray('3')
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a max', () => {
    parser.grammar = <DigitString max={5} />

    data = parser.parseArray('3')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('3')
    expect(data[0].result).to.equal('3')

    data = parser.parseArray('5')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal('5')

    data = parser.parseArray('7')
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a min and a max', () => {
    parser.grammar = <DigitString min={3} max={5} />

    data = parser.parseArray('2')
    expect(data).to.have.length(0)

    data = parser.parseArray('3')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('3')
    expect(data[0].result).to.equal('3')

    data = parser.parseArray('4')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('4')
    expect(data[0].result).to.equal('4')

    data = parser.parseArray('5')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('5')
    expect(data[0].result).to.equal('5')

    data = parser.parseArray('6')
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a minLength', () => {
    parser.grammar = <DigitString minLength={2} />

    data = parser.parseArray('04')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('04')
    expect(data[0].result).to.equal('04')

    data = parser.parseArray('403')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('403')
    expect(data[0].result).to.equal('403')

    data = parser.parseArray('3')
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a maxLength', () => {
    parser.grammar = <DigitString maxLength={3} />

    data = parser.parseArray('02')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('02')
    expect(data[0].result).to.equal('02')

    data = parser.parseArray('403')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('403')
    expect(data[0].result).to.equal('403')

    data = parser.parseArray('4032')
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a minLength and a maxLength', () => {
    parser.grammar = <DigitString minLength={2} maxLength={4} />

    data = parser.parseArray('2')
    expect(data).to.have.length(0)

    data = parser.parseArray('03')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('03')
    expect(data[0].result).to.equal('03')

    data = parser.parseArray('440')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('440')
    expect(data[0].result).to.equal('440')

    data = parser.parseArray('4242')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('4242')
    expect(data[0].result).to.equal('4242')

    data = parser.parseArray('123456')
    expect(data).to.have.length(0)
  })

  it('handles a digit string with a all validators', () => {
    parser.grammar = <DigitString minLength={3} maxLength={4} min={10} max={8000} />

    data = parser.parseArray('002')
    expect(data).to.have.length(0)

    data = parser.parseArray('20')
    expect(data).to.have.length(0)

    data = parser.parseArray('100')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('100')
    expect(data[0].result).to.equal('100')

    data = parser.parseArray('0777')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('0777')
    expect(data[0].result).to.equal('0777')

    data = parser.parseArray('7000')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('7000')
    expect(data[0].result).to.equal('7000')

    data = parser.parseArray('8500')
    expect(data).to.have.length(0)

    data = parser.parseArray('07500')
    expect(data).to.have.length(0)
  })

  it('rejects leading zeros with allowLeadingZeros', () => {
    parser.grammar = <DigitString allowLeadingZeros={false} />

    data = parser.parseArray('02')
    expect(data).to.have.length(0)

    data = parser.parseArray('20')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('20')
    expect(data[0].result).to.equal('20')

    data = parser.parseArray('0')
    expect(data).to.have.length(1)
    expect(fulltext.all(data[0])).to.equal('0')
    expect(data[0].result).to.equal('0')
  })
})
