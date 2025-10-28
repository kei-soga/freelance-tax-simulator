import { MathHelper } from "~/helpers/math";
import {
    type IDeduction,
    IncomeTaxBaseDeduction,
    ResidentTaxBaseDeduction,
    NationalHealthInsurancePremiumBaseDeduction,
} from "~/models/deduction";
import {
    NATIONAL_PENSION_INSURANCE_PREMIUM,
    NATIONAL_PENSION_INSURANCE_ADDITIONAL_PREMIUM,
    CITIZEN_RESIDENT_TAX_RATE,
    PREFECTURAL_CITIZEN_RESIDENT_TAX_RATE,
    CITIZEN_RESIDENT_TAX_PER_CAPITA_BASIS,
    PREFECTURAL_CITIZEN_RESIDENT_TAX_PER_CAPITA_BASIS,
    FOREST_ENVIRONMENTAL_TAX,
    NATIONAL_HEALTH_INSURANCE_PREMIUM_RATE,
    NATIONAL_HEALTH_INSURANCE_MAX_PREMIUM,
    NATIONAL_HEALTH_INSURANCE_PREMIUM_PER_CAPITA_BASIS,
    NATIONAL_HEALTH_INSURANCE_PREMIUM_HOUSEHOLD_PER_CAPITA_BASIS,
    INCOME_TAX_RATE_ELEVATIONS,
    INCOME_TAX_RATE,
    INCOME_TAX_RATE_DEDUCTION,
} from "~/common/consts";

export interface ITax {
    /**
     * 所得から所得控除を引く
     * @param deduction 所得控除額
     */
    addIncomeDeduction(deduction: IDeduction): void;

    /**
     * 税額を返す
     * @returns 税額
     */
    value(): number;
}

export class IncomeTax implements ITax {
    private income: number;
    private basicAmount: number;
    private baseDeduction: number;

    constructor(income: number, year: number = new Date().getFullYear()) {
        this.income = income;
        this.baseDeduction = new IncomeTaxBaseDeduction(this.income, year).value();
        this.basicAmount = this.computeBasicAmount();
    }

    /**
     * 所得から基礎控除を引いて算定基礎額を算出する
     * @returns 算定基礎額
     */
    private computeBasicAmount(): number {
        const basicAmount = this.income - this.baseDeduction;

        return Math.max(basicAmount, 0);
    }

    /**
     * 所得税を算出する
     * @returns 所得税額
     */
    private computeIncomeTax(): number {
        if (this.basicAmount <= INCOME_TAX_RATE_ELEVATIONS.L1.max) {
            return this.basicAmount * INCOME_TAX_RATE.L1 - INCOME_TAX_RATE_DEDUCTION.L1;
        } else if (this.basicAmount <= INCOME_TAX_RATE_ELEVATIONS.L2.max) {
            return this.basicAmount * INCOME_TAX_RATE.L2 - INCOME_TAX_RATE_DEDUCTION.L2;
        } else if (this.basicAmount <= INCOME_TAX_RATE_ELEVATIONS.L3.max) {
            return this.basicAmount * INCOME_TAX_RATE.L3 - INCOME_TAX_RATE_DEDUCTION.L3;
        } else if (this.basicAmount <= INCOME_TAX_RATE_ELEVATIONS.L4.max) {
            return this.basicAmount * INCOME_TAX_RATE.L4 - INCOME_TAX_RATE_DEDUCTION.L4;
        } else if (this.basicAmount <= INCOME_TAX_RATE_ELEVATIONS.L5.max) {
            return this.basicAmount * INCOME_TAX_RATE.L5 - INCOME_TAX_RATE_DEDUCTION.L5;
        } else if (this.basicAmount <= INCOME_TAX_RATE_ELEVATIONS.L6.max) {
            return this.basicAmount * INCOME_TAX_RATE.L6 - INCOME_TAX_RATE_DEDUCTION.L6;
        } else {
            return this.basicAmount * INCOME_TAX_RATE.L7 - INCOME_TAX_RATE_DEDUCTION.L7;
        }
    }

    addIncomeDeduction(deduction: IDeduction): void {
        if (deduction.isApply()) {
            this.basicAmount -= deduction.value();
        }
    }

    value(): number {
        return this.computeIncomeTax();
    }
}

/**
 * 住民税（千葉県松戸市）クラス
 */
export class ResidentTax implements ITax {
    private income: number;
    private basicAmount: number;
    private baseDeduction: number;

    constructor(income: number) {
        this.income = income;
        this.baseDeduction = new ResidentTaxBaseDeduction().value();
        this.basicAmount = this.computeBasicAmount();
    }

    /**
     * 所得から基礎控除を引いて算定基礎額を算出する
     * @returns 算定基礎額
     */
    private computeBasicAmount(): number {
        const basicAmount = this.income - this.baseDeduction;

        return Math.max(basicAmount, 0);
    }

    /**
     * 所得割の税額を算出する
     * @returns 所得割税額
     */
    private computePerIncomeBasis(): number {
        const total_tax_rate = CITIZEN_RESIDENT_TAX_RATE + PREFECTURAL_CITIZEN_RESIDENT_TAX_RATE;
        var perIncomeBasis = this.basicAmount * total_tax_rate - this.computeAdjustmentDeduction();

        return MathHelper.floor(perIncomeBasis, 2);
    }

    /**
     * 均等割の税額を算出する
     * @returns 均等割税額
     */
    private computePerCapitaBasis(): number {
        return CITIZEN_RESIDENT_TAX_PER_CAPITA_BASIS + PREFECTURAL_CITIZEN_RESIDENT_TAX_PER_CAPITA_BASIS;
    }

    /**
     * 森林環境税を算出する
     * @returns 森林環境税
     */
    private computeForestEnvironmentalTax(): number {
        return FOREST_ENVIRONMENTAL_TAX;
    }

    /**
     * 調整控除を算出する
     * @returns 調整控除額
     */
    private computeAdjustmentDeduction(): number {
        if (this.income > 25000000) {
            return 0;
        }

        const deduction = 50000;
        if (this.income <= 2000000) {
            return Math.floor(Math.min(deduction, this.income) * 0.05);
        } else {
            const adjustmentdeduction = (deduction - (this.income - 2000000)) * 0.05;
            return Math.max(Math.floor(adjustmentdeduction), 2500);
        }
    }

    addIncomeDeduction(deduction: IDeduction): void {
        if (deduction.isApply()) {
            this.basicAmount -= deduction.value();
        }
    }

    value(): number {
        return this.computePerIncomeBasis() + this.computePerCapitaBasis() + this.computeForestEnvironmentalTax();
    }
}

/**
 * 国民健康保険料（千葉県松戸市）クラス
 */
export class NationalHealthInsurancePremium implements ITax {
    private income: number;
    private basicAmount: number;
    private insuredPersons: number;
    private isElderlyLongTermCareInsurance: boolean;
    private baseDeduction: number;

    constructor(income: number, insuredPersons: number = 1, isElderlyLongTermCareInsurance: boolean = false) {
        this.income = income;
        this.baseDeduction = new NationalHealthInsurancePremiumBaseDeduction().value();
        this.basicAmount = this.computeBasicAmount();
        this.insuredPersons = Math.max(insuredPersons, 1);
        this.isElderlyLongTermCareInsurance = isElderlyLongTermCareInsurance;
    }

    /**
     * 総合所得から基礎控除を引いて算定基礎額を算出する
     * @returns 算定基礎額
     */
    private computeBasicAmount(): number {
        const basicAmount = this.income - this.baseDeduction;
        return Math.max(basicAmount, 0);
    }

    /**
     * 国民健康保険料のうち、医療分を算出する
     * @returns 医療分の健康保険料
     */
    computeMedicalCare(): number {
        var perIncomeBasis = Math.floor(this.basicAmount * NATIONAL_HEALTH_INSURANCE_PREMIUM_RATE.MEDICAL_CARE);

        // 所得割 + 均等割 + 世帯別平等割
        const tax =
            perIncomeBasis +
            this.insuredPersons * NATIONAL_HEALTH_INSURANCE_PREMIUM_PER_CAPITA_BASIS.MEDICAL_CARE +
            NATIONAL_HEALTH_INSURANCE_PREMIUM_HOUSEHOLD_PER_CAPITA_BASIS;

        return Math.min(tax, NATIONAL_HEALTH_INSURANCE_MAX_PREMIUM.MEDICAL_CARE);
    }

    /**
     * 国民健康保険料のうち、後期支援分を算出する
     * @returns 後期支援分の健康保険料
     */
    computeLateTermSupport(): number {
        var perIncomeBasis = Math.floor(this.basicAmount * NATIONAL_HEALTH_INSURANCE_PREMIUM_RATE.LATE_TERM_SUPPORT);

        // 所得割 + 均等割
        const tax =
            perIncomeBasis +
            this.insuredPersons * NATIONAL_HEALTH_INSURANCE_PREMIUM_PER_CAPITA_BASIS.LATE_TERM_SUPPORT;

        return Math.min(tax, NATIONAL_HEALTH_INSURANCE_MAX_PREMIUM.LATE_TERM_SUPPORT);
    }

    /**
     * 国民健康保険料のうち、介護分を算出する。
     * 介護分の支払い対象外の場合はかからない。
     * @returns 介護分の健康保険料
     */
    computeElderlyLongTermCare(): number {
        if (this.isElderlyLongTermCareInsurance) {
            var perIncomeBasis = Math.floor(
                this.basicAmount * NATIONAL_HEALTH_INSURANCE_PREMIUM_RATE.ELDERLY_LONG_TERM_CARE
            );

            // 所得割 + 均等割
            const tax =
                perIncomeBasis +
                this.insuredPersons * NATIONAL_HEALTH_INSURANCE_PREMIUM_PER_CAPITA_BASIS.ELDERLY_LONG_TERM_CARE;

            return Math.min(tax, NATIONAL_HEALTH_INSURANCE_MAX_PREMIUM.ELDERLY_LONG_TERM_CARE);
        } else {
            return 0;
        }
    }

    addIncomeDeduction(deduction: IDeduction): void {
        if (deduction.isApply()) {
            this.basicAmount -= deduction.value();
        }
    }

    value(): number {
        return this.computeMedicalCare() + this.computeLateTermSupport() + this.computeElderlyLongTermCare();
    }
}

/**
 * 国民年金保険料クラス
 */
export class NationalPensionInsurancePremium implements ITax {
    private members: number;
    private additionalInsurancePremium: boolean;

    constructor(members: number = 1, additionalInsurancePremium: boolean = false) {
        this.members = members;
        this.additionalInsurancePremium = additionalInsurancePremium;
    }

    addIncomeDeduction(deduction: IDeduction): void {}

    value(): number {
        if (this.additionalInsurancePremium) {
            const tax = NATIONAL_PENSION_INSURANCE_PREMIUM + NATIONAL_PENSION_INSURANCE_ADDITIONAL_PREMIUM;
            return tax * 12 * this.members;
        } else {
            return NATIONAL_PENSION_INSURANCE_PREMIUM * 12 * this.members;
        }
    }
}
