describe('Test variable declaration', () => {
    a = require('../output/index.js')
    b = require('../output/GlobalSettings')
    it('parse speed correctly', () => {
        var s = new a.qysFileParser('<180>')
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Speed: 180 }))
    })

    it('parse volume shorthand correctly', () => {
        var s = new a.qysFileParser('<180.0>')
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Volume: 180.0 }))

        var s = new a.qysFileParser('<3.14159>')
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Volume: 3.14159 }))
    })

    it('parse bar/beat shorthand correctly', () => {
        var s = new a.qysFileParser('<4/4>')
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings())

        var s = new a.qysFileParser('<3/8>')
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Bar: 3, Beat: 8 }))
    })

    it('parse key shorthand correctly', () => {
        var s = new a.qysFileParser('<1=C>')
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Key: 0 }))

        var s = new a.qysFileParser('<1=bB>')
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Key: -2 }))

        var s = new a.qysFileParser("<1=bB,',,>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Key: -2, Oct: -2 }))
    })

    it('parse general KV pair correctly', () => {
        var s = new a.qysFileParser("<Key:2>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Key: 2 }))

        var s = new a.qysFileParser("<Bar:3>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Bar: 3 }))

        var s = new a.qysFileParser("<Beat:6>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Beat: 6 }))

        var s = new a.qysFileParser("<Speed:80>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Speed: 80 }))

        var s = new a.qysFileParser("<Volume:1.5>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Volume: 1.5 }))

        var s = new a.qysFileParser("<Instr:Violin>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Instr: 'Violin' }))

        var s = new a.qysFileParser("<Stac:1/4>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Stac: 1 / 4 }))

        var s = new a.qysFileParser("<Port:4>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Port: 4 }))

        var s = new a.qysFileParser("<Appo:1/3>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Appo: 1 / 3 }))

        var s = new a.qysFileParser("<Dur:1.5>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Dur: 1.5 }))

        var s = new a.qysFileParser("<Oct:-1>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ Oct: -1 }))

        var s = new a.qysFileParser("<FadeIn:1/8>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ FadeIn: 0.125 }))

        var s = new a.qysFileParser("<FadeOut:1/2>")
        var ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new b.GlobalSettings({ FadeOut: 0.5 }))
    })

    it('throws incorrect input', () => {
        var s = new a.qysFileParser("<1..>")
        expect(() => { s.parse() }).toThrow("illegal variable")
    
        var s = new a.qysFileParser("<1=C,.>")
        expect(() => { s.parse() }).toThrow("illegal tonality")
        
        var s = new a.qysFileParser("<1=J>")
        expect(() => { s.parse() }).toThrow("illegal tonality")
    })
})