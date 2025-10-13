import { useState } from "react";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [{ title: "個人事業主 税金計算ツール" }];
}

const INCOME_TAX_BASIC_DEDUCTION = 480_000; // 所得税基礎控除
const RESIDENTIAL_TAX_BASIC_DEDUCTION = 430_000; // 住民税基礎控除
const NATIONAL_HEALTH_INSURANCE_BASIC_DEDUCTION = 430_000; // 国民健康保険基礎控除
const BLUE_RETURN_SYSTEM_DEDUCTION = 650_000; // 青色申告特別控除

function getTaxableIncome(bussinessIncome: number, deduction: number): number {
    const taxableIncome = Math.floor(bussinessIncome / 1000) * 1000 - deduction;
    return taxableIncome > 0 ? taxableIncome : 0;
}

function getTaxByIncome(
    taxableIncome: number,
    taxRate: number,
    deduction: number = 0,
    min: number = 1000,
    max: number = Infinity
): number {
    var tax = 0;

    if (taxableIncome > max) {
        tax = (max - min + 1000) * taxRate - deduction;
    }

    if (taxableIncome >= min && taxableIncome <= max) {
        tax = (taxableIncome - min + 1000) * taxRate - deduction;
    }

    return tax > 0 ? Math.floor(tax) : 0;
}

function getIncomeTax(
    bussinessIncome: number,
    isBlueReturnSystem: boolean = true
): number {
    var totalDeduction = INCOME_TAX_BASIC_DEDUCTION; // 基礎控除
    if (isBlueReturnSystem) {
        totalDeduction += BLUE_RETURN_SYSTEM_DEDUCTION; // 青色申告特別控除
    }

    const taxableIncome = getTaxableIncome(bussinessIncome, totalDeduction);

    if (taxableIncome >= 40_000_000) {
        return taxableIncome * 0.45 - 4_796_000;
    }

    if (taxableIncome >= 18_000_000) {
        return taxableIncome * 0.4 - 2_796_000;
    }

    if (taxableIncome >= 9_000_000) {
        return taxableIncome * 0.33 - 1_536_000;
    }

    if (taxableIncome >= 6_950_000) {
        return taxableIncome * 0.23 - 636_000;
    }

    if (taxableIncome >= 3_300_000) {
        return taxableIncome * 0.2 - 427_500;
    }

    if (taxableIncome >= 1_950_000) {
        return taxableIncome * 0.1 - 97_500;
    }

    if (taxableIncome >= 1000) {
        return taxableIncome * 0.05 - 0;
    }

    return 0;
}

function addReconstructionTax(incomeTax: number) {
    // 復興特別所得税2.1%を所得税額に加算する。
    // 平成25年から令和19年まで
    return Math.floor(incomeTax * 1.021);
}

function getResidentialTax(
    bussinessIncome: number,
    isBlueReturnSystem: boolean = true
): number {
    // 松戸市は45万円以下の人は住民税非課税(単身者・扶養なしの場合)
    if (getTaxableIncome(bussinessIncome, 0) <= 450_000) {
        return 0;
    }

    // 所得から基礎控除を減算する。
    var totalDeduction = RESIDENTIAL_TAX_BASIC_DEDUCTION;
    if (isBlueReturnSystem) {
        totalDeduction += BLUE_RETURN_SYSTEM_DEDUCTION;
    }
    var taxableIncome = getTaxableIncome(bussinessIncome, totalDeduction);

    // 均等割5000円は必須
    var totalTax = 5000;

    // 市民税6%、県民税4%の合計10%
    totalTax += taxableIncome * 0.1;

    return totalTax;
}

function getNationalHealthInsurance(
    bussinessIncome: number,
    isOverForty: boolean = false,
    isBlueReturnSystem: boolean = true
): number {
    var totalDeduction = NATIONAL_HEALTH_INSURANCE_BASIC_DEDUCTION;
    if (isBlueReturnSystem) {
        totalDeduction += BLUE_RETURN_SYSTEM_DEDUCTION;
    }
    var taxableIncome = getTaxableIncome(bussinessIncome, totalDeduction);

    var medical = taxableIncome * 0.0762 + 21000 + 18000;
    var lateStageSupport = taxableIncome * 0.0262 + 12000;
    var nursing = 0;
    if (isOverForty) {
        nursing = taxableIncome * 0.0181 + 15000;
    }

    var totalTax = 0;
    totalTax += medical <= 660_000 ? medical : 660_000;
    totalTax += lateStageSupport <= 260_000 ? lateStageSupport : 260_000;
    totalTax += nursing <= 170_000 ? nursing : 170_000;

    return totalTax;
}

function getNationalPension() {
    // 令和7年度国民年金掛金参照
    return 17510 * 12;
}

export default function TaxSimulator() {
    const [bussinessIncome, setBussinessIncome] = useState("0");
    const [expense, setExpense] = useState("0");
    const [blueReturnSystem, setBlueReturnSystem] = useState(true);
    const [overForty, setOverForty] = useState(false);
    const [incomeTax, setIncomeTax] = useState(0);
    const [residentialTax, setResidentialTax] = useState(0);
    const [nationalPension, setNationalPension] = useState(0);
    const [nationalHealthInsurance, setNationalHealthInsurance] = useState(0);

    function onclickCalculateHandler() {
        setIncomeTax(
            addReconstructionTax(
                getIncomeTax(
                    Number(bussinessIncome) - Number(expense),
                    blueReturnSystem
                )
            )
        );
        setResidentialTax(
            getResidentialTax(
                Number(bussinessIncome) - Number(expense),
                blueReturnSystem
            )
        );
        setNationalPension(getNationalPension());
        setNationalHealthInsurance(
            getNationalHealthInsurance(
                Number(bussinessIncome) - Number(expense),
                overForty,
                blueReturnSystem
            )
        );
    }

    return (
        <div className="mx-8 my-4">
            <h2 className="text-xl mb-5">所得等入力</h2>
            <div className="mb-3">
                <label>
                    事業所得
                    <input
                        className="ml-3 px-1 border border-solid rounded-md"
                        type="text"
                        value={bussinessIncome}
                        onClick={() => {
                            Number(bussinessIncome) == 0
                                ? setBussinessIncome("")
                                : undefined;
                        }}
                        onChange={(e) => setBussinessIncome(e.target.value)}
                        onBlur={() => {
                            bussinessIncome == "" ? setBussinessIncome("0") : undefined;
                        }}
                    />
                </label>
                <label className="ml-8">
                    経費
                    <input
                        className="ml-3 px-1 border border-solid rounded-md"
                        type="text"
                        value={expense}
                        onClick={() => {
                            Number(expense) == 0 ? setExpense("") : undefined;
                        }}
                        onChange={(e) => setExpense(e.target.value)}
                        onBlur={() => {
                            expense == "" ? setExpense("0") : undefined;
                        }}
                    />
                </label>
            </div>
            <div className="mb-5">
                <label>
                    青色申告
                    <input
                        className="ml-2"
                        type="checkbox"
                        checked={blueReturnSystem}
                        onChange={(e) => setBlueReturnSystem(e.target.checked)}
                    />
                </label>
                <label className="ml-8">
                    40歳～64歳ですか？
                    <input
                        className="ml-2"
                        type="checkbox"
                        checked={overForty}
                        onChange={(e) => setOverForty(e.target.checked)}
                    />
                </label>
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onclickCalculateHandler()}
            >
                計算
            </button>

            <h2 className="text-xl mb-5 mt-8">個人事業主に掛かる税金等</h2>
            <h3>所得税(特別復興支援税含む)</h3>
            <p>{incomeTax.toLocaleString()}</p>

            <h3>住民税</h3>
            <p>{residentialTax.toLocaleString()}</p>

            <h3>国民年金</h3>
            <p>{nationalPension.toLocaleString()}</p>

            <h3>国民健康保険料</h3>
            <p>{nationalHealthInsurance.toLocaleString()}</p>

            <h2 className="text-xl mb-5 mt-8">毎月収支</h2>
            <h3>毎月収入(平均)</h3>
            <p>
                {Math.floor(
                    (Number(bussinessIncome) - Number(expense)) / 12
                ).toLocaleString()}
            </p>

            <h3 className="mt-5">毎月支出</h3>
            <p>所得税: {Math.ceil(incomeTax / 12).toLocaleString()}</p>
            <p>住民税: {Math.ceil(residentialTax / 12).toLocaleString()}</p>
            <p>国民年金: {Math.ceil(nationalPension / 12).toLocaleString()}</p>
            <p>
                国民健康保険料:{" "}
                {Math.ceil(nationalHealthInsurance / 12).toLocaleString()}
            </p>

            <p className="mt-5">
                合計:{" "}
                {(
                    Math.ceil(incomeTax / 12) +
                    Math.ceil(residentialTax / 12) +
                    Math.ceil(nationalPension / 12) +
                    Math.ceil(nationalHealthInsurance / 12)
                ).toLocaleString()}
            </p>

            <h2 className="text-xl mb-5 mt-8">収入 - 税金</h2>
            <p>
                {(
                    Math.floor(
                        (Number(bussinessIncome) - Number(expense)) / 12
                    ) -
                    Math.ceil(incomeTax / 12) -
                    Math.ceil(residentialTax / 12) -
                    Math.ceil(nationalPension / 12) -
                    Math.ceil(nationalHealthInsurance / 12)
                ).toLocaleString()}
            </p>
        </div>
    );
}
