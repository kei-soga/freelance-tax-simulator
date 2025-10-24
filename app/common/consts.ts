import { DictHelper } from "~/helpers/dict";

// 白色申告・青色申告特別控除額タイプ
export type ITaxReturnMethodSpecialDeduction = {
    BOOKEEPING: {
        SINGLE_ENTRY: number;
        DOUBLE_ENTRY: number;
    };
    SUBMIT: {
        MAIL: number;
        ETAX: number;
    };
};

// 白色申告特別控除額
export const WHITE_RETURN_SYSTEM_SPECIAL_DEDUCTION: ITaxReturnMethodSpecialDeduction = {
    BOOKEEPING: {
        SINGLE_ENTRY: 0,
        DOUBLE_ENTRY: 0,
    },
    SUBMIT: {
        MAIL: 0,
        ETAX: 0,
    },
} as const;

// 青色申告特別控除額
export const BLUE_RETURN_SYSTEM_SPECIAL_DEDUCTION: ITaxReturnMethodSpecialDeduction = {
    BOOKEEPING: {
        SINGLE_ENTRY: 100000,
        DOUBLE_ENTRY: 550000,
    },
    SUBMIT: {
        MAIL: 0,
        ETAX: 100000,
    },
} as const;

// 国民健康保険料基礎控除額（松戸市）
export const NATIONAL_HEALTH_INSURANCE_PREMIUM_BASE_DEDUCTION = 430000;

// 住民税基礎控除額（松戸市）
export const RESIDENT_TAX_BASE_DEDUCTION = 430000;

// 所得税基礎控除額
export const INCOME_TAX_BASE_DEDUCTIONS = {
    L1: 950000,
    L2: 580000,
    L3: 480000,
    L4: 320000,
    L5: 160000,
    L6: 0,
} as const;

// 所得税累進課税
export const INCOME_TAX_BASE_DEDUCTION_ELEVATIONS = {
    L1: DictHelper.createMinMax(1000, 1320000),
    L2: DictHelper.createMinMax(1321000, 23500000),
    L3: DictHelper.createMinMax(23501000, 24000000),
    L4: DictHelper.createMinMax(24001000, 24500000),
    L5: DictHelper.createMinMax(24501000, 25000000),
    L6: DictHelper.createMinMax(25001000, Infinity),
} as const;
