import {
    type IDeduction,
    IncomeTaxBaseDeduction,
    ResidentTaxBaseDeduction,
    NationalHealthInsurancePremiumBaseDeduction,
} from "~/models/deduction";
import { type IIncome, BusinessIncome } from "~/models/income";

test("所得税基礎控除", () => {
    let deduction: IDeduction;
    let income: IIncome;
    income = new BusinessIncome(1320000);
    deduction = new IncomeTaxBaseDeduction(income, 2024);
    expect(deduction.isApply()).toBeTruthy();
    expect(deduction.value()).toBe(480000);

    income = new BusinessIncome(24000000);
    deduction = new IncomeTaxBaseDeduction(income, 2024);
    expect(deduction.value()).toBe(480000);

    income = new BusinessIncome(24500000);
    deduction = new IncomeTaxBaseDeduction(income, 2024);
    expect(deduction.value()).toBe(320000);

    income = new BusinessIncome(25000000);
    deduction = new IncomeTaxBaseDeduction(income, 2024);
    expect(deduction.value()).toBe(160000);

    income = new BusinessIncome(25001000);
    deduction = new IncomeTaxBaseDeduction(income, 2024);
    expect(deduction.value()).toBe(0);

    income = new BusinessIncome(1320000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(950000);

    income = new BusinessIncome(3360000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(880000);

    income = new BusinessIncome(4890000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(680000);

    income = new BusinessIncome(6550000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(630000);

    income = new BusinessIncome(23500000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(580000);

    income = new BusinessIncome(24000000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(480000);

    income = new BusinessIncome(24500000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(320000);

    income = new BusinessIncome(25000000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(160000);

    income = new BusinessIncome(25001000);
    deduction = new IncomeTaxBaseDeduction(income, 2026);
    expect(deduction.value()).toBe(0);

    income = new BusinessIncome(1320000);
    deduction = new IncomeTaxBaseDeduction(income, 2027);
    expect(deduction.value()).toBe(950000);

    income = new BusinessIncome(23500000);
    deduction = new IncomeTaxBaseDeduction(income, 2027);
    expect(deduction.value()).toBe(580000);

    income = new BusinessIncome(24000000);
    deduction = new IncomeTaxBaseDeduction(income, 2027);
    expect(deduction.value()).toBe(480000);

    income = new BusinessIncome(24500000);
    deduction = new IncomeTaxBaseDeduction(income, 2027);
    expect(deduction.value()).toBe(320000);

    income = new BusinessIncome(25000000);
    deduction = new IncomeTaxBaseDeduction(income, 2027);
    expect(deduction.value()).toBe(160000);

    income = new BusinessIncome(25001000);
    deduction = new IncomeTaxBaseDeduction(income, 2027);
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
