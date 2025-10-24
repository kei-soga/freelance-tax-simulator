import { createDefaultEsmPreset } from "ts-jest";

const preset = createDefaultEsmPreset();
const tsJestTransformCfg = preset.transform;
const tsJestExtensionsToTreatAsEsm = preset.extensionsToTreatAsEsm;

/** @type {import("jest").Config} **/
export default {
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg,
    },
    extensionsToTreatAsEsm: tsJestExtensionsToTreatAsEsm,
    moduleNameMapper: {
        "^~/(.*)$": ["<rootDir>/app/$1"],
    },
};
