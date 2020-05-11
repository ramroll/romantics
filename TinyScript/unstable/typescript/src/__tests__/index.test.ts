import { sum } from '../index'
import { expect } from 'chai'

describe('Test', () => {
  it('Sum ', () => {
    expect(sum(1, 2)).to.equal(3)
  });
});