import { ResidentTaxBaseDeduction, NationalHealthInsurancePremiumBaseDeduction } from "~/logic/deduction";

interface ITax {
    /**
     * 税額を返す
     * @returns 税額
     */
    value(): number;
}

/**
 * 住民税（千葉県松戸市）クラス
 */
class ResidentTax implements ITax {
    private basicAmount: number;
    private baseDeduction: number;

    constructor(income: number) {
        this.baseDeduction = new ResidentTaxBaseDeduction().value();
        this.basicAmount = this.computedBasicAmount(income);
    }

    /**
     * 所得から基礎控除を引いて算定基礎額を算出する
     * @returns 算定基礎額
     */
    private computedBasicAmount(income: number): number {
        const basicAmount = income - this.baseDeduction;

        return basicAmount >= 0 ? basicAmount : 0;
    }

    /**
     * 所得割を算出する
     * @returns 所得割
     */
    private computedPerIncomeBasis(): number {
        var perIncomeBasis = this.basicAmount * (0.06 + 0.04) - this.computedAdjustmentDeduction();
        return Math.floor(perIncomeBasis / 100) * 100;
    }

    /**
     * 均等割を算出する
     * @returns 市民税均等割 + 県民税均等割
     */
    private computedPerCapitaBasis(): number {
        return 3000 + 1000;
    }

    /**
     * 森林環境税を算出する
     * @returns 森林環境税
     */
    private computedForestEnvironmentalTax(): number {
        return 1000;
    }

    /**
     * 調整控除を算出する
     * @returns 調整控除額
     */
    private computedAdjustmentDeduction(): number {
        if (this.basicAmount > 25000000) {
            return 0;
        }

        const deduction = 50000;
        if (this.basicAmount <= 2000000) {
            if (this.computedPerIncomeBasis() > deduction) {
                return Math.floor(deduction * 0.05);
            } else {
                return Math.floor(this.computedPerIncomeBasis() * 0.05);
            }
        } else {
            const adjustmentdeduction = (deduction - (this.basicAmount - 2000000)) * 0.05;
            return adjustmentdeduction >= 2500 ? Math.floor(adjustmentdeduction) : 2500;
        }
    }

    value(): number {
        return this.computedPerIncomeBasis() + this.computedPerCapitaBasis() + this.computedForestEnvironmentalTax();
    }
}

/**
 * 国民健康保険料（千葉県松戸市）クラス
 */
class NationalHealthInsurancePremium implements ITax {
    private basicAmount: number;
    private insuredPersons: number;
    private isElderlyLongTermCareInsurance: boolean;
    private baseDeduction: number;

    constructor(income: number, insuredPersons: number = 1, isElderlyLongTermCareInsurance: boolean = false) {
        this.baseDeduction = new NationalHealthInsurancePremiumBaseDeduction().value();
        this.basicAmount = this.computedBasicAmount(income);
        this.insuredPersons = insuredPersons >= 1 ? insuredPersons : 1;
        this.isElderlyLongTermCareInsurance = isElderlyLongTermCareInsurance;
    }

    /**
     * 総合所得から基礎控除を引いて算定基礎額を算出する
     * @param income 所得
     * @returns 算定基礎額
     */
    private computedBasicAmount(income: number): number {
        const basicAmount = income - this.baseDeduction;
        return basicAmount >= 0 ? basicAmount : 0;
    }

    /**
     * 国民健康保険料のうち、医療分を算出する
     * @returns 医療分の健康保険料
     */
    computedMedicalCare(): number {
        const MAX_TAX = 660000;
        var perIncomeBasis = Math.floor(this.basicAmount * 0.0762);
        perIncomeBasis = perIncomeBasis >= MAX_TAX ? MAX_TAX : perIncomeBasis;

        // 所得割 + 均等割 + 世帯別平等割
        return perIncomeBasis + this.insuredPersons * 21000 + 18000;
    }

    /**
     * 国民健康保険料のうち、後期支援分を算出する
     * @returns 後期支援分の健康保険料
     */
    computedLateTermSupport(): number {
        const MAX_TAX = 260000;
        var perIncomeBasis = Math.floor(this.basicAmount * 0.0262);
        perIncomeBasis = perIncomeBasis >= MAX_TAX ? MAX_TAX : perIncomeBasis;

        // 所得割 + 均等割 + 世帯別平等割
        return perIncomeBasis + this.insuredPersons * 12000 + 0;
    }

    /**
     * 国民健康保険料のうち、介護分を算出する
     * @returns 介護分の健康保険料
     */
    computedElderlyLongTermCare(): number {
        if (this.isElderlyLongTermCareInsurance) {
            const MAX_TAX = 170000;
            var perIncomeBasis = Math.floor(this.basicAmount * 0.0181);
            perIncomeBasis = perIncomeBasis >= MAX_TAX ? MAX_TAX : perIncomeBasis;

            return perIncomeBasis + this.insuredPersons * 15000 + 0;
        } else {
            return 0;
        }
    }

    value(): number {
        return this.computedMedicalCare() + this.computedLateTermSupport() + this.computedElderlyLongTermCare();
    }
}

/**
 * 国民年金保険料クラス
 */
class NationalPensionInsurancePremium implements ITax {
    private additionalInsurancePremium: boolean;

    constructor(additionalInsurancePremium: boolean = false) {
        this.additionalInsurancePremium = additionalInsurancePremium;
    }

    value(): number {
        const TAX = 17510;
        if (this.additionalInsurancePremium) {
            return TAX + 400;
        } else {
            return TAX;
        }
    }
}
