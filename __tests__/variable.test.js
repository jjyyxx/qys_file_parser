describe('Test iable declaration', () => {
    const Parser = require('../output/index.js')
    const Setting = require('../output/GlobalSettings')
    it('parse speed correctly', () => {
        const s = new Parser.qysFileParser('<180>')
        const ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Speed: 180 }))
    })

    it('parse volume shorthand correctly', () => {
        let s = new Parser.qysFileParser('<180.0>')
        let ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Volume: 180.0 }))

        s = new Parser.qysFileParser('<3.14159>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Volume: 3.14159 }))
    })

    it('parse bar/beat shorthand correctly', () => {
        let s = new Parser.qysFileParser('<4/4>')
        let ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings())

        s = new Parser.qysFileParser('<3/8>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Bar: 3, Beat: 8 }))
    })

    it('parse key shorthand correctly', () => {
        let s = new Parser.qysFileParser('<1=C>')
        let ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Key: 0 }))

        s = new Parser.qysFileParser('<1=bB>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Key: -2 }))

        s = new Parser.qysFileParser("<1=bB,',,>")
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Key: -2, Oct: -2 }))
    })

    it('parse general KV pair correctly', () => {
        let s = new Parser.qysFileParser('<Key:2>')
        let ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Key: 2 }))

        s = new Parser.qysFileParser('<Bar:3>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Bar: 3 }))

        s = new Parser.qysFileParser('<Beat:6>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Beat: 6 }))

        s = new Parser.qysFileParser('<Speed:80>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Speed: 80 }))

        s = new Parser.qysFileParser('<Volume:1.5>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Volume: 1.5 }))

        s = new Parser.qysFileParser('<Instr:Violin>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Instr: 'Violin' }))

        s = new Parser.qysFileParser('<Stac:1/4>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Stac: 1 / 4 }))

        s = new Parser.qysFileParser('<Port:4>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Port: 4 }))

        s = new Parser.qysFileParser('<Appo:1/3>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Appo: 1 / 3 }))

        s = new Parser.qysFileParser('<Dur:1.5>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Dur: 1.5 }))

        s = new Parser.qysFileParser('<Oct:-1>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ Oct: -1 }))

        s = new Parser.qysFileParser('<FadeIn:1/8>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ FadeIn: 0.125 }))

        s = new Parser.qysFileParser('<FadeOut:1/2>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].sequence).toHaveLength(0)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({ FadeOut: 0.5 }))
    })

    it('throws incorrect input', () => {
        let s = new Parser.qysFileParser('<1..>')
        expect(() => { s.parse() }).toThrow('illegal variable')

        s = new Parser.qysFileParser('<1=C,.>')
        expect(() => { s.parse() }).toThrow('illegal tonality')

        s = new Parser.qysFileParser('<1=J>')
        expect(() => { s.parse() }).toThrow('illegal tonality')
    })

    it('parses multiple iables correctly', () => {
        let s = new Parser.qysFileParser('<Instr:Violin><Dur:1.5><FadeIn:1/8>')
        let ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({
            Instr: 'Violin',
            Dur: 1.5,
            FadeIn: 0.125
        }))

        // possible overwrite
        s = new Parser.qysFileParser('<Instr:Violin><Dur:1.5><FadeIn:1/8><Instr:Piano>')
        ret = s.parse()
        expect(ret.sections).toHaveLength(1)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({
            Instr: 'Piano',
            Dur: 1.5,
            FadeIn: 0.125
        }))
    })

    it('integrates with staffs', () => {
        let s = new Parser.qysFileParser('<Instr:Violin><Dur:1.5><FadeIn:1/8>1231..23<Instr:Piano>5342<Dur:2><FadeOut:3>342')
        let ret = s.parse()
        expect(ret.sections).toHaveLength(3)
        expect(ret.sections[0].setting).toEqual(new Setting.GlobalSettings({
            Instr: 'Violin',
            Dur: 1.5,
            FadeIn: 0.125
        }))
        expect(ret.sections[1].setting).toEqual(new Setting.GlobalSettings({
            Instr: 'Piano',
            Dur: 1.5,
            FadeIn: 0.125
        }))
        expect(ret.sections[2].setting).toEqual(new Setting.GlobalSettings({
            Instr: 'Piano',
            Dur: 2,
            FadeIn: 0.125,
            FadeOut: 3
        }))
    })
})
