import game from '../src/game'
import util from '../src/util'

describe('Util module', function () {
  it('should check if something is in an array', function () {
    let arr = [1, 2, 3]
    let arr2 = ['one', 'two', 'three']
    let arr3 = ['%', '123', 1]
    expect(util.isInArray(1, arr)).toBe(true)
    expect(util.isInArray('two', arr2)).toBe(true)
    expect(util.isInArray('%', arr3)).toBe(true)
    expect(util.isInArray(4, arr)).toBe(false)
    expect(util.isInArray('four', arr2)).toBe(false)
    expect(util.isInArray('!', arr3)).toBe(false)
  })
})
