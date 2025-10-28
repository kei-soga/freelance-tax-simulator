export class MathHelper {
    /**
     * 与えられた数値を指定の桁数で切り捨てて返す。
     * @param x 数値
     * @param digit 桁数 (0始まり)
     * @returns 切り捨て実行後の数値
     */
    static floor(x: number, digit: number = 0): number {
        return Math.floor(x / Math.pow(10, digit)) * Math.pow(10, digit);
    }
}
