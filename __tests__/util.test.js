describe('Test utility function correctness', () => {
    require('../output/Util')
    it('returns last element', () => {
        expect([1].last()).toBe(1)
        expect([1, 2, 3, 7].last()).toBe(7)
        expect([1, 2, 3, 7].last(3)).toBe(2)
        expect([1, 2, 3, 7].last(5)).toBe(undefined)
    })

    it('calculate oct correctly', () => {
        expect(',,,'.calcOct()).toBe(-3)
        expect("',,,'".calcOct()).toBe(-1)
        expect(",,''".calcOct()).toBe(0)
        expect(',,.,'.calcOct()).toBe(NaN)
    })

    it('changes x/y to fraction correctly', () => {
        expect('1/4'.toFraction()).toEqual({
            Numerator: 1,
            Denominator: 4
        })

        expect('1.2/4.3'.toFraction()).toEqual({
            Numerator: 1.2,
            Denominator: 4.3
        })

        expect('-1.2/-4.3'.toFraction()).toEqual({
            Numerator: -1.2,
            Denominator: -4.3
        })

        expect('1/4/'.toFraction()).toBe(undefined)
        expect('1/g4'.toFraction()).toBe(undefined)
    })

    it('change string to Num if possible', () => {
        expect('1'.toNumIfPossible()).toBe(1)
        expect('1.121'.toNumIfPossible()).toBe(1.121)
        expect('1/123'.toNumIfPossible()).toBe(1 / 123)
        expect('-1/-123'.toNumIfPossible()).toBe(1 / 123)
        expect('-1//-123'.toNumIfPossible()).toBe('-1//-123')
        expect('avdsredcagvngfbdv'.toNumIfPossible()).toBe('avdsredcagvngfbdv')
    })

    it('reverse Object from entry correctly', () => {
        var obj = [{
            key: 'asd',
            value: 'dsa'
        },
        {
            key: ',.,.,',
            value: 123
        }
        ]
        expect(Object.reverseFrom(obj)).toEqual({
            asd: 'dsa',
            ',.,.,': 123
        })
    })
})