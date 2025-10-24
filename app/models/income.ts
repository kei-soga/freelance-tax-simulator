/**
 * 所得インターフェース
 */
export interface IIncome {
    /**
     * 課税所得額を返す
     * @return 課税所得額
     */
    value(): number;

    /**
     * 必要経費を追加
     * @param expense 必要経費額
     */
    addExpense(expense: number): void;
}

/**
 * 事業所得モデル
 */
export class BusinessIncome implements IIncome {
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    value(): number {
        // 1000円未満切り捨て
        return Math.floor(this._value / 1000) * 1000;
    }

    addExpense(expense: number) {
        // 所得から必要経費を引く
        this._value -= expense;
    }
}
