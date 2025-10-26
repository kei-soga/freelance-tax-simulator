import {
    RESIDENT_TAX_BASE_DEDUCTION,
    NATIONAL_HEALTH_INSURANCE_PREMIUM_BASE_DEDUCTION,
    INCOME_TAX_BASE_DEDUCTIONS,
    INCOME_TAX_BASE_DEDUCTION_ELEVATIONS,
} from "~/common/consts";
import { type IIncome } from "~/models/income";

export interface IDeduction {
    /**
     * 控除額を返す
     * @returns 控除額
     */
    value(): number;

    /**
     * 控除が適用されるか判定する
     * @returns 控除対象か
     */
    isApply(): boolean;
}

/**
 * 所得税基礎控除クラス
 */
export class IncomeTaxBaseDeduction implements IDeduction {
    private income: IIncome;
    private target_year: number;

    constructor(income: IIncome, target_year: number = new Date().getFullYear()) {
        this.income = income;
        this.target_year = target_year;
    }

    /**
     * 令和6年分以前の基礎控除額を算出する
     * @returns 控除額
     */
    private before2024(): number {
        if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L1.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L3;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L2.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L3;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L3.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L3;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L4.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L4;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L5.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L5;
        } else {
            return INCOME_TAX_BASE_DEDUCTIONS.L6;
        }
    }

    /**
     * 令和7年分～令和8年分の基礎控除額を算出する
     * @returns 控除額
     */
    private between2025and2026(): number {
        if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L1.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L1;
        } else if (this.income.value() <= 3360000) {
            return 880000;
        } else if (this.income.value() <= 4890000) {
            return 680000;
        } else if (this.income.value() <= 6550000) {
            return 630000;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L2.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L2;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L3.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L3;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L4.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L4;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L5.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L5;
        } else {
            return INCOME_TAX_BASE_DEDUCTIONS.L6;
        }
    }

    /**
     * 令和9年分からの基礎控除額を算出する
     * @returns 控除額
     */
    private after2027(): number {
        if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L1.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L1;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L2.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L2;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L3.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L3;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L4.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L4;
        } else if (this.income.value() <= INCOME_TAX_BASE_DEDUCTION_ELEVATIONS.L5.max) {
            return INCOME_TAX_BASE_DEDUCTIONS.L5;
        } else {
            return INCOME_TAX_BASE_DEDUCTIONS.L6;
        }
    }

    value(): number {
        if (!this.isApply()) {
            return 0;
        }

        if (this.target_year <= 2024) {
            // 令和6年分以前の基礎控除
            return this.before2024();
        } else if (this.target_year <= 2026) {
            // 令和7年～8年分以前の基礎控除
            return this.between2025and2026();
        } else {
            // 令和9年分以降の基礎控除
            return this.after2027();
        }
    }

    isApply(): boolean {
        return true;
    }
}

/**
 * 住民税基礎控除クラス
 */
export class ResidentTaxBaseDeduction implements IDeduction {
    value(): number {
        if (!this.isApply()) {
            return 0;
        }

        return RESIDENT_TAX_BASE_DEDUCTION;
    }

    isApply(): boolean {
        return true;
    }
}

/**
 * 国民健康保険料基礎控除クラス
 */
export class NationalHealthInsurancePremiumBaseDeduction implements IDeduction {
    value(): number {
        if (!this.isApply()) {
            return 0;
        }

        return NATIONAL_HEALTH_INSURANCE_PREMIUM_BASE_DEDUCTION;
    }

    isApply(): boolean {
        return true;
    }
}
