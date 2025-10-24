import { DictHelper, type IMinMaxDictMember } from "~/helpers/dict";

describe("DictHelper", () => {
    test("static createMinMax()", () => {
        let c: IMinMaxDictMember;
        c = DictHelper.createMinMax(1, 2);
        expect(c).toHaveProperty("min");
        expect(c).toHaveProperty("max");
        expect(c.min).toBe(1);
        expect(c.max).toBe(2);
    });
});
