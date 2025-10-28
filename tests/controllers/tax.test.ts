import {
    type ITax,
    IncomeTax,
    ResidentTax,
    NationalPensionInsurancePremium,
    NationalHealthInsurancePremium,
} from "~/controllers/tax";

describe("税金", () => {
    test("所得税", () => {
        let tax: ITax;
        /**
         * 令和6年以前
         */
        tax = new IncomeTax(1320000, 2024);
        expect(tax.value()).toBe(42000);

        tax = new IncomeTax(3360000, 2024);
        expect(tax.value()).toBe(190500);

        tax = new IncomeTax(4890000, 2024);
        expect(tax.value()).toBe(454500);

        tax = new IncomeTax(6550000, 2024);
        expect(tax.value()).toBe(786500);

        tax = new IncomeTax(23500000, 2024);
        expect(tax.value()).toBe(6412000);

        tax = new IncomeTax(24000000, 2024);
        expect(tax.value()).toBe(6612000);

        tax = new IncomeTax(24500000, 2024);
        expect(tax.value()).toBe(6876000);

        tax = new IncomeTax(25000000, 2024);
        expect(tax.value()).toBe(7140000);

        tax = new IncomeTax(25001000, 2024);
        expect(tax.value()).toBe(7204400);

        tax = new IncomeTax(1949000, 2024);
        expect(tax.value()).toBe(73450);

        tax = new IncomeTax(3299000, 2024);
        expect(tax.value()).toBe(184400);

        tax = new IncomeTax(6949000, 2024);
        expect(tax.value()).toBe(866300);

        tax = new IncomeTax(8999000, 2024);
        expect(tax.value()).toBe(1323370);

        tax = new IncomeTax(17999000, 2024);
        expect(tax.value()).toBe(4245270);

        tax = new IncomeTax(39999000, 2024);
        expect(tax.value()).toBe(13203600);

        tax = new IncomeTax(40000000, 2024);
        expect(tax.value()).toBe(13204000);

        /**
         * 令和7年～令和8年
         */
        tax = new IncomeTax(1320000, 2026);
        expect(tax.value()).toBe(18500);

        tax = new IncomeTax(3360000, 2026);
        expect(tax.value()).toBe(150500);

        tax = new IncomeTax(4890000, 2026);
        expect(tax.value()).toBe(414500);

        tax = new IncomeTax(6550000, 2026);
        expect(tax.value()).toBe(756500);

        tax = new IncomeTax(23500000, 2026);
        expect(tax.value()).toBe(6372000);

        tax = new IncomeTax(24000000, 2026);
        expect(tax.value()).toBe(6612000);

        tax = new IncomeTax(24500000, 2026);
        expect(tax.value()).toBe(6876000);

        tax = new IncomeTax(25000000, 2026);
        expect(tax.value()).toBe(7140000);

        tax = new IncomeTax(25001000, 2026);
        expect(tax.value()).toBe(7204400);

        tax = new IncomeTax(1949000, 2026);
        expect(tax.value()).toBe(53450);

        tax = new IncomeTax(3299000, 2026);
        expect(tax.value()).toBe(144400);

        tax = new IncomeTax(6949000, 2026);
        expect(tax.value()).toBe(846300);

        tax = new IncomeTax(8999000, 2026);
        expect(tax.value()).toBe(1300370);

        tax = new IncomeTax(17999000, 2026);
        expect(tax.value()).toBe(4212270);

        tax = new IncomeTax(39999000, 2026);
        expect(tax.value()).toBe(13203600);

        tax = new IncomeTax(40000000, 2026);
        expect(tax.value()).toBe(13204000);

        /**
         * 令和9年以降
         */
        tax = new IncomeTax(1320000, 2027);
        expect(tax.value()).toBe(18500);

        tax = new IncomeTax(3360000, 2027);
        expect(tax.value()).toBe(180500);

        tax = new IncomeTax(4890000, 2027);
        expect(tax.value()).toBe(434500);

        tax = new IncomeTax(6550000, 2027);
        expect(tax.value()).toBe(766500);

        tax = new IncomeTax(23500000, 2027);
        expect(tax.value()).toBe(6372000);

        tax = new IncomeTax(24000000, 2027);
        expect(tax.value()).toBe(6612000);

        tax = new IncomeTax(24500000, 2027);
        expect(tax.value()).toBe(6876000);

        tax = new IncomeTax(25000000, 2027);
        expect(tax.value()).toBe(7140000);

        tax = new IncomeTax(25001000, 2027);
        expect(tax.value()).toBe(7204400);

        tax = new IncomeTax(1949000, 2027);
        expect(tax.value()).toBe(68450);

        tax = new IncomeTax(3299000, 2027);
        expect(tax.value()).toBe(174400);

        tax = new IncomeTax(6949000, 2027);
        expect(tax.value()).toBe(846300);

        tax = new IncomeTax(8999000, 2027);
        expect(tax.value()).toBe(1300370);

        tax = new IncomeTax(17999000, 2027);
        expect(tax.value()).toBe(4212270);

        tax = new IncomeTax(39999000, 2027);
        expect(tax.value()).toBe(13203600);

        tax = new IncomeTax(40000000, 2027);
        expect(tax.value()).toBe(13204000);
    });

    test("住民税", () => {
        let tax: ITax;
        tax = new ResidentTax(2000000);
        expect(tax.value()).toBe(159500);

        tax = new ResidentTax(3000000);
        expect(tax.value()).toBe(259500);

        tax = new ResidentTax(9876543);
        expect(tax.value()).toBe(947100);

        tax = new ResidentTax(25001000);
        expect(tax.value()).toBe(2462100);
    });

    test("国民健康保険料", () => {
        let tax: ITax;
        tax = new NationalHealthInsurancePremium(3000000);
        expect(tax.value()).toBe(314168);

        tax = new NationalHealthInsurancePremium(3000000, 1, false);
        expect(tax.value()).toBe(314168);

        tax = new NationalHealthInsurancePremium(3000000, 1, true);
        expect(tax.value()).toBe(375685);

        tax = new NationalHealthInsurancePremium(3000000, 2, false);
        expect(tax.value()).toBe(347168);

        tax = new NationalHealthInsurancePremium(3000000, 2, true);
        expect(tax.value()).toBe(423685);

        tax = new NationalHealthInsurancePremium(30000000, 10, false);
        expect(tax.value()).toBe(920000);

        tax = new NationalHealthInsurancePremium(30000000, 10, true);
        expect(tax.value()).toBe(1090000);
    });

    test("国民年金", () => {
        let tax: ITax;
        tax = new NationalPensionInsurancePremium();
        expect(tax.value()).toBe(210120);

        tax = new NationalPensionInsurancePremium(1, true);
        expect(tax.value()).toBe(214920);

        tax = new NationalPensionInsurancePremium(2, false);
        expect(tax.value()).toBe(420240);

        tax = new NationalPensionInsurancePremium(2, true);
        expect(tax.value()).toBe(429840);
    });
});
