import { MathHelper } from "~/helpers/math";

describe("MathHelper", () => {
    test("static floor()", () => {
        expect(MathHelper.floor(55555.55555)).toBe(55555);
        expect(MathHelper.floor(55555.55555, 0)).toBe(55555);
        expect(MathHelper.floor(55555.55555, 1)).toBe(55550);
        expect(MathHelper.floor(55555.55555, -1)).toBe(55555.5);
        expect(MathHelper.floor(55555.55555, 6)).toBe(0);
        expect(MathHelper.floor(55555.55555, -6)).toBe(55555.55555);
    });
});
