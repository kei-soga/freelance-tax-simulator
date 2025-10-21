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
    private income: number;
    private now: Date;

    constructor(income: number) {
        this.income = income;
        this.now = new Date();
    }

    private between2025and2026(): number {
        if (this.income <= 1320000) {
            return 950000;
        } else if (this.income <= 3360000) {
            return 880000;
        } else if (this.income <= 4890000) {
            return 680000;
        } else if (this.income <= 6550000) {
            return 630000;
        } else if (this.income <= 23500000) {
            return 580000;
        } else if (this.income <= 24000000) {
            return 480000;
        } else if (this.income <= 24500000) {
            return 320000;
        } else if (this.income <= 25000000) {
            return 160000;
        } else {
            return 0;
        }
    }

    private after2027(): number {
        if (this.income <= 1320000) {
            return 950000;
        } else if (this.income <= 23500000) {
            return 580000;
        } else if (this.income <= 24000000) {
            return 480000;
        } else if (this.income <= 24500000) {
            return 320000;
        } else if (this.income <= 25000000) {
            return 160000;
        } else {
            return 0;
        }
    }

    value(): number {
        if (!this.isApply()) {
            return 0;
        }

        if (this.now.getFullYear() <= 2026) {
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

        return 430000;
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

        return 430000;
    }

    isApply(): boolean {
        return true;
    }
}

export class SocialInsurancePremiumDeduction implements IDeduction {
    constructor() {}

    value(): number {
        if (!this.isApply()) {
            return 0;
        }

        return 0;
    }

    isApply(): boolean {
        return true;
    }
}
