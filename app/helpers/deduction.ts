interface IDeduction {
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
 * 基礎控除クラス
 */
class BaseDeduction implements IDeduction {
    private income: number;
    private now: Date;

    constructor(income: number) {
        this.income = income;
        this.now = new Date();
    }

    private before2024(): number {
        if (this.income <= 2400_0000) {
            return 48_0000;
        } else if (this.income <= 2450_0000) {
            return 32_0000;
        } else if (this.income <= 2500_0000) {
            return 16_0000;
        } else {
            return 0;
        }
    }

    private between2025and2026(): number {
        if (this.income <= 132_0000) {
            return 95_0000;
        } else if (this.income <= 336_0000) {
            return 88_0000;
        } else if (this.income <= 489_0000) {
            return 68_0000;
        } else if (this.income <= 655_0000) {
            return 63_0000;
        } else if (this.income <= 2350_0000) {
            return 58_0000;
        } else if (this.income <= 2400_0000) {
            return 48_0000;
        } else if (this.income <= 2450_0000) {
            return 32_0000;
        } else if (this.income <= 2500_0000) {
            return 16_0000;
        } else {
            return 0;
        }
    }

    private after2027(): number {
        if (this.income <= 132_0000) {
            return 95_0000;
        } else if (this.income <= 2350_0000) {
            return 58_0000;
        } else if (this.income <= 2400_0000) {
            return 48_0000;
        } else if (this.income <= 2450_0000) {
            return 32_0000;
        } else if (this.income <= 2500_0000) {
            return 16_0000;
        } else {
            return 0;
        }
    }

    value(): number {
        if (this.now.getFullYear() <= 2024) {
            // 令和6年分以前の基礎控除
            return this.before2024();
        } else if (this.now.getFullYear() <= 2026) {
            // 令和7年～8年分以前の基礎控除
            return this.between2025and2026();
        } else {
            // 令和9年分以降の基礎控除
            return this.after2027();
        }
    }

    isApply(): boolean {
        // 全員が適用対象
        return true;
    }
}
