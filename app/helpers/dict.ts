export type IMinMaxDictMember = {
    min: number;
    max: number;
};

export class DictHelper {
    static createMinMax(min: number, max: number): IMinMaxDictMember {
        return { min: min, max: max };
    }
}
