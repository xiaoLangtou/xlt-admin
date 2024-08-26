export namespace Dict {
  export interface IDictType {
    id?: string | number;
    dictName: string;
    dictCode: string;
    dictDesc?: string;
    systemFlag: string;
  }

  export interface IDictData {
    id?: string | number;
    dictValue: string;
    dictLabel: string;
    dictRemark?: string;
    dictSort?: number | undefined;
    dictTypeId: number | undefined;
    dictType?: string;
    dictDesc?: string;
  }
}
