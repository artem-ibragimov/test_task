import { BaseAttr, DATA_TYPE } from 'src/core/Attr';
import { ISerializable } from 'src/core/Serialize';

export default class Employee implements ISerializable {

   readonly attrs: IAttrs;
   constructor(attrs: BaseAttr[] = [], readonly id: EmployeeID = generateID()) {
      this.attrs = attrs.reduce<IAttrs>((acc, cur) => { acc[cur.label] = cur; return acc; }, {});
   };

   serialize() {
      return JSON.stringify({ id: this.id, attrs: Object.values(this.attrs).map((attr) => attr.serialize()) });
   }

   deserialize(ser: string) {
      try {
         const { id, attrs } = JSON.parse(ser) as { id: EmployeeID, attrs: string[]; };
         return new Employee(attrs.map(BaseAttr.from), id);
      } catch (e) {
         console.error(e);
      }
   }

   static from(ser: string) {
      return new Employee().deserialize(ser);
   }

   static new() {
      const required = true;
      return new Employee([
         new BaseAttr<string>(DATA_TYPE.STR, 'ФИО', 'Без имени', [], required),
         new BaseAttr<string>(DATA_TYPE.SELECT, 'Должность', 'Без должности', ['Без должности', 'Гендир', 'Не Гендир'], required),
         new BaseAttr<string>(DATA_TYPE.DATE, 'Дата рождения', ''),
         new BaseAttr<'М' | 'Ж'>(DATA_TYPE.RADIO, 'Пол', 'М', ['М', 'Ж']),
         new BaseAttr<boolean>(DATA_TYPE.BOOL, 'Уволен', false),
      ]);
   }


}

const generateID = (): EmployeeID => `${Math.random()}`;

type IAttrs = Record<string, BaseAttr>;
export type EmployeeID = string;