import { WhiteTaxReturnModel, BlueTaxReturnModel, type ITaxReturn } from "~/models/taxReturnMethod";
import { BookeepingType, SubmitType } from "~/common/enums";
import { WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION, BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION } from "~/common/consts";

test("白色申告クラスが正しく生成されること", () => {
    let whiteTaxReturn: ITaxReturn;
    whiteTaxReturn = new WhiteTaxReturnModel();
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(whiteTaxReturn.value).toBe(
        WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.SINGLE_ENTRY +
            WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.MAIL
    );

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.singleEntry, SubmitType.mail);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(whiteTaxReturn.value).toBe(
        WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.SINGLE_ENTRY +
            WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.MAIL
    );

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.singleEntry, SubmitType.eTax);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(whiteTaxReturn.value).toBe(
        WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.SINGLE_ENTRY +
            WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.ETAX
    );

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.doubleEntry, SubmitType.mail);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(whiteTaxReturn.value).toBe(
        WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.DOUBLE_ENTRY +
            WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.MAIL
    );

    whiteTaxReturn = new WhiteTaxReturnModel(BookeepingType.doubleEntry, SubmitType.eTax);
    expect(whiteTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(whiteTaxReturn.value).toBe(
        WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.DOUBLE_ENTRY +
            WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.ETAX
    );
});

test("青色申告クラスが正しく生成されること", () => {
    let blueTaxReturn: ITaxReturn;
    blueTaxReturn = new BlueTaxReturnModel();
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(blueTaxReturn.value).toBe(
        BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.DOUBLE_ENTRY + BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.ETAX
    );

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.singleEntry, SubmitType.mail);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(blueTaxReturn.value).toBe(
        BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.SINGLE_ENTRY + BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.MAIL
    );

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.singleEntry, SubmitType.eTax);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.singleEntry);
    expect(blueTaxReturn.value).toBe(
        BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.SINGLE_ENTRY + BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.ETAX
    );

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.doubleEntry, SubmitType.mail);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(blueTaxReturn.value).toBe(
        BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.DOUBLE_ENTRY + BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.MAIL
    );

    blueTaxReturn = new BlueTaxReturnModel(BookeepingType.doubleEntry, SubmitType.eTax);
    expect(blueTaxReturn.bookeeping).toBe(BookeepingType.doubleEntry);
    expect(blueTaxReturn.value).toBe(
        BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.BOOKEEPING.DOUBLE_ENTRY + BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION.SUBMIT.ETAX
    );
});
