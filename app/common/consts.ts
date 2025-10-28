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

// 所得税　基礎控除枠
export const INCOME_TAX_BASE_DEDUCTION_ELEVATIONS = {
    L1: DictHelper.createMinMax(1000, 1320000),
    L2: DictHelper.createMinMax(1321000, 23500000),
    L3: DictHelper.createMinMax(23501000, 24000000),
    L4: DictHelper.createMinMax(24001000, 24500000),
    L5: DictHelper.createMinMax(24501000, 25000000),
    L6: DictHelper.createMinMax(25001000, Infinity),
} as const;

// 所得税　超過累進税率枠
export const INCOME_TAX_RATE_ELEVATIONS = {
    L1: DictHelper.createMinMax(1000, 1949000),
    L2: DictHelper.createMinMax(1950000, 3299000),
    L3: DictHelper.createMinMax(3300000, 6949000),
    L4: DictHelper.createMinMax(6950000, 8999000),
    L5: DictHelper.createMinMax(9000000, 17999000),
    L6: DictHelper.createMinMax(18000000, 39999000),
    L7: DictHelper.createMinMax(40000000, Infinity),
} as const;
// 所得税　超過累進税率
export const INCOME_TAX_RATE = {
    L1: 0.05,
    L2: 0.1,
    L3: 0.2,
    L4: 0.23,
    L5: 0.33,
    L6: 0.4,
    L7: 0.45,
} as const;
// 所得税　超過累進税率　控除額
export const INCOME_TAX_RATE_DEDUCTION = {
    L1: 0,
    L2: 97500,
    L3: 427500,
    L4: 636000,
    L5: 1536000,
    L6: 2796000,
    L7: 4796000,
} as const;

// 国民年金保険料
export const NATIONAL_PENSION_INSURANCE_PREMIUM = 17510;
// 国民年金付加保険料
export const NATIONAL_PENSION_INSURANCE_ADDITIONAL_PREMIUM = 400;

// 市民住民税率（松戸市）
export const CITIZEN_RESIDENT_TAX_RATE = 0.06;
// 県民住民税率（松戸市）
export const PREFECTURAL_CITIZEN_RESIDENT_TAX_RATE = 0.04;
// 市民住民税均等割額（松戸市）
export const CITIZEN_RESIDENT_TAX_PER_CAPITA_BASIS = 3000;
// 県民住民税均等割額（松戸市）
export const PREFECTURAL_CITIZEN_RESIDENT_TAX_PER_CAPITA_BASIS = 1000;
// 森林環境税（松戸市）
export const FOREST_ENVIRONMENTAL_TAX = 1000;

// 国民健康保険料 所得割税率
export const NATIONAL_HEALTH_INSURANCE_PREMIUM_RATE = {
    MEDICAL_CARE: 0.0762,
    LATE_TERM_SUPPORT: 0.0262,
    ELDERLY_LONG_TERM_CARE: 0.0181,
} as const;
// 国民健康保険料 上限所得割税額
export const NATIONAL_HEALTH_INSURANCE_MAX_PREMIUM = {
    MEDICAL_CARE: 660000,
    LATE_TERM_SUPPORT: 260000,
    ELDERLY_LONG_TERM_CARE: 170000,
} as const;
// 国民健康保険料　均等割
export const NATIONAL_HEALTH_INSURANCE_PREMIUM_PER_CAPITA_BASIS = {
    MEDICAL_CARE: 21000,
    LATE_TERM_SUPPORT: 12000,
    ELDERLY_LONG_TERM_CARE: 15000,
} as const;
// 国民健康保険料　世帯別平等割
export const NATIONAL_HEALTH_INSURANCE_PREMIUM_HOUSEHOLD_PER_CAPITA_BASIS = 18000;
