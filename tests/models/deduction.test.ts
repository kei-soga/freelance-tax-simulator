import {
    type IDeduction,
    IncomeTaxBaseDeduction,
    ResidentTaxBaseDeduction,
    NationalHealthInsurancePremiumBaseDeduction,
} from "~/models/deduction";

test("所得税基礎控除", () => {
    let deduction: IDeduction;
    deduction = new IncomeTaxBaseDeduction(1320000, 2024);
    expect(deduction.isApply()).toBeTruthy();
    expect(deduction.value()).toBe(480000);

    deduction = new IncomeTaxBaseDeduction(24000000, 2024);
    expect(deduction.value()).toBe(480000);

    deduction = new IncomeTaxBaseDeduction(24500000, 2024);
    expect(deduction.value()).toBe(320000);

    deduction = new IncomeTaxBaseDeduction(25000000, 2024);
    expect(deduction.value()).toBe(160000);

    deduction = new IncomeTaxBaseDeduction(25001000, 2024);
    expect(deduction.value()).toBe(0);

    deduction = new IncomeTaxBaseDeduction(1320000, 2026);
    expect(deduction.value()).toBe(950000);

    deduction = new IncomeTaxBaseDeduction(3360000, 2026);
    expect(deduction.value()).toBe(880000);

    deduction = new IncomeTaxBaseDeduction(4890000, 2026);
    expect(deduction.value()).toBe(680000);

    deduction = new IncomeTaxBaseDeduction(6550000, 2026);
    expect(deduction.value()).toBe(630000);

    deduction = new IncomeTaxBaseDeduction(23500000, 2026);
    expect(deduction.value()).toBe(580000);

    deduction = new IncomeTaxBaseDeduction(24000000, 2026);
    expect(deduction.value()).toBe(480000);

    deduction = new IncomeTaxBaseDeduction(24500000, 2026);
    expect(deduction.value()).toBe(320000);

    deduction = new IncomeTaxBaseDeduction(25000000, 2026);
    expect(deduction.value()).toBe(160000);

    deduction = new IncomeTaxBaseDeduction(25001000, 2026);
    expect(deduction.value()).toBe(0);

    deduction = new IncomeTaxBaseDeduction(1320000, 2027);
    expect(deduction.value()).toBe(950000);

    deduction = new IncomeTaxBaseDeduction(23500000, 2027);
    expect(deduction.value()).toBe(580000);

    deduction = new IncomeTaxBaseDeduction(24000000, 2027);
    expect(deduction.value()).toBe(480000);

    deduction = new IncomeTaxBaseDeduction(24500000, 2027);
    expect(deduction.value()).toBe(320000);

    deduction = new IncomeTaxBaseDeduction(25000000, 2027);
    expect(deduction.value()).toBe(160000);

    deduction = new IncomeTaxBaseDeduction(25001000, 2027);
    expect(deduction.value()).toBe(0);
});

test("住民税基礎控除", () => {
    const deduction: IDeduction = new ResidentTaxBaseDeduction();
    expect(deduction.isApply()).toBeTruthy();
    expect(deduction.value()).toBe(430000);
});

test("国民健康保険料基礎控除", () => {
    const deduction: IDeduction = new NationalHealthInsurancePremiumBaseDeduction();
    expect(deduction.isApply()).toBeTruthy();
    expect(deduction.value()).toBe(430000);
});
