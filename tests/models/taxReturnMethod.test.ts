import { WhiteTaxReturnModel, BlueTaxReturnModel, type ITaxReturn } from "~/models/taxReturnMethod";
import { BookeepingType, SubmitType } from "~/common/enums";

test("白色申告クラスが正しく生成されること", () => {
    let whiteTaxReturn: ITaxReturn;
    whiteTaxReturn = new WhiteTaxReturnModel();
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(whiteTaxReturn.value).toBe(0);

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.singleEntry, SubmitType.mail);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(whiteTaxReturn.value).toBe(0);

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.singleEntry, SubmitType.eTax);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(whiteTaxReturn.value).toBe(0);

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.doubleEntry, SubmitType.mail);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(whiteTaxReturn.value).toBe(0);

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.doubleEntry, SubmitType.eTax);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(whiteTaxReturn.value).toBe(0);
});

test("青色申告クラスが正しく生成されること", () => {
    let blueTaxReturn: ITaxReturn;
    blueTaxReturn = new BlueTaxReturnModel();
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(blueTaxReturn.value).toBe(650000);

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.singleEntry, SubmitType.mail);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(blueTaxReturn.value).toBe(100000);

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.singleEntry, SubmitType.eTax);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(blueTaxReturn.value).toBe(100000);

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.doubleEntry, SubmitType.mail);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(blueTaxReturn.value).toBe(550000);

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.doubleEntry, SubmitType.eTax);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(blueTaxReturn.value).toBe(650000);
});
