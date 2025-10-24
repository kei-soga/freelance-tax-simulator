/**
 * 確定申告　記帳方法
 * @enum
 * @param singleEntry 単式簿記
 * @param doubleEntry 複式簿記
 */
export const BookeepingType = {
    singleEntry: 0,
    doubleEntry: 1,
} as const;
export type BookeepingType = (typeof BookeepingType)[keyof typeof BookeepingType];

/**
 * 確定申告　提出方法
 * @enum
 * @param mail 郵送
 * @param eTax e-tax
 */
export const SubmitType = {
    mail: 0,
    eTax: 1,
} as const;
export type SubmitType = (typeof SubmitType)[keyof typeof SubmitType];
