import { type IIncome, BusinessIncome } from "~/models/income";

test("事業所得クラスが正しく生成されること", () => {
    let income: IIncome;

    income = new BusinessIncome(1);
    expect(income.value()).toBe(0);

    income = new BusinessIncome(500);
    expect(income.value()).toBe(0);

    income = new BusinessIncome(1000);
    expect(income.value()).toBe(1000);

    income = new BusinessIncome(1001);
    expect(income.value()).toBe(1000);

    income = new BusinessIncome(1500);
    expect(income.value()).toBe(1000);
});

test("所得から経費を引けること", () => {
    let income: IIncome;
    income = new BusinessIncome(1000000);
    income.addExpense(0);
    expect(income.value()).toBe(1000000);

    income = new BusinessIncome(1000000);
    income.addExpense(500);
    expect(income.value()).toBe(999000);

    income = new BusinessIncome(1000000);
    income.addExpense(1000);
    expect(income.value()).toBe(999000);
});
