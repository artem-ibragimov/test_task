import { action, computed, observable } from 'mobx';
import { ISerializable } from 'src/core/Serialize';

export class BaseAttr<T = any> implements ISerializable {
   private _value = observable.box<T>();

   constructor(
      readonly type: DATA_TYPE,
      /** Наименование атрибута */
      public label: string,
      value: T,
      public dataRange: T[] = [],
      public isRequired: boolean = false
   ) {
      this.change(value);
   }

   change = action((v: T) => {
      this._value.set(v);
   });

   @computed get value(): T {
      return this._value.get();
   }

   serialize() {
      return JSON.stringify({
         type: this.type,
         label: this.label,
         value: this.value,
         dataRange: this.dataRange,
         isRequired: this.isRequired
      } as IProps<T>);
   }

   static from<T>(ser: string) {
      const { label, value, dataRange, isRequired, type } = JSON.parse(ser) as IProps<T>;
      return new BaseAttr(type, label, value, dataRange, isRequired);
   }
}

type IProps<T> = {
   type: DATA_TYPE,
   label: string,
   value: T,
   dataRange: T[],
   isRequired: boolean;
};


export enum DATA_TYPE {
   STR,
   DATE,
   RADIO,
   BOOL,
   SELECT,
}