describe('basic staffUnit test', ()=> {
    it('properly map pitch', () => {
        var a = require('../output/StaffUnit.js');
        var s = new a.StaffUnit(1);
        expect(s.pitch).toBe(0);
        s = new a.StaffUnit(2);
        expect(s.pitch).toBe(2);
        s = new a.StaffUnit(3);
        expect(s.pitch).toBe(4);
        s = new a.StaffUnit(4);
        expect(s.pitch).toBe(5);
        s = new a.StaffUnit(5);
        expect(s.pitch).toBe(7);
        s = new a.StaffUnit(6);
        expect(s.pitch).toBe(9);
        s = new a.StaffUnit(7);
        expect(s.pitch).toBe(11);
      })
})