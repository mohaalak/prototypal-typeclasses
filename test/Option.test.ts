import { map } from 'src/Functor'
import * as O from 'src/Option'
import { pipe } from 'src/pipe'
import { expectTypeOf } from 'expect-type'

describe('Option', () => {
  it('has data constructors', () => {
    expect(O.none).toBeInstanceOf(O.Option)
    expect(O.some(3)).toBeInstanceOf(O.Option)
    expect(O.some('foo')).toBeInstanceOf(O.Option)
  })

  describe('Functor instance', () => {
    it('exists', () => {
      expect(
        pipe(
          O.some(3),
          map((x) => x.toLocaleString()),
        ),
      ).toEqual(O.some('3'))

      expect(
        pipe(
          O.some('quux'),
          map((x) => x.length),
        ),
      ).toEqual(O.some(4))

      expect(
        pipe(
          O.none as O.Option<number>,
          map((x) => x.toLocaleString()),
        ),
      ).toEqual(O.none)
    })

    it('typechecks', () => {
      expectTypeOf(
        pipe(
          O.some('quux'),
          map((s) => s.length),
        ),
      ).toEqualTypeOf<O.Option<number>>()
    })
  })
})
