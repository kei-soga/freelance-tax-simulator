import {
    type ITaxReturnMethodSpecialDeduction,
    WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION,
    BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION,
} from "~/common/consts";
import { BookeepingType, SubmitType } from "~/common/enums";

/**
 * 確定申告インターフェース
 */
export interface ITaxReturn {
    readonly value: number;
    readonly bookeeping: BookeepingType;
}

abstract class BaseTaxReturnModel implements ITaxReturn {
    readonly value: number;
    readonly bookeeping: BookeepingType;

    constructor(specialDeduction: ITaxReturnMethodSpecialDeduction, bookeeping: BookeepingType, submit: SubmitType) {
        this.bookeeping = bookeeping;
        this.value = 0;

        switch (bookeeping) {
            case BookeepingType.singleEntry:
                this.value = specialDeduction.BOOKEEPING.SINGLE_ENTRY;
                break;

            case BookeepingType.doubleEntry:
                this.value = specialDeduction.BOOKEEPING.DOUBLE_ENTRY;
                break;
        }

        if (bookeeping == BookeepingType.doubleEntry && submit == SubmitType.eTax) {
            this.value += specialDeduction.SUBMIT.ETAX;
        }
    }
}

/**
 * 白色申告モデル
 */
export class WhiteTaxReturnModel extends BaseTaxReturnModel {
    constructor(bookeeping: BookeepingType = BookeepingType.singleEntry, submit: SubmitType = SubmitType.mail) {
        super(WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION, bookeeping, submit);
    }
}

/**
 * 青色申告モデル
 */
export class BlueTaxReturnModel extends BaseTaxReturnModel {
    constructor(bookeeping: BookeepingType = BookeepingType.doubleEntry, submit: SubmitType = SubmitType.eTax) {
        super(BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION, bookeeping, submit);
    }
}
