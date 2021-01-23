import { action, computed, observable, toJS } from 'mobx';
import Employee, { EmployeeID } from 'src/core/Employee';
import BaseStore from 'src/store/Base';

export default class EmployeesStore extends BaseStore<Employee>{
   protected STORAGE_KEY = 'EmployeesStore';

   private checked: Set<EmployeeID> = observable.set(new Set());
   private choosenID = observable.box<EmployeeID>('');

   check = action((id: EmployeeID, isChecked: boolean) => {
      isChecked ? this.checked.add(id) : this.checked.delete(id);
   });

   @computed getChecked(): EmployeeID[] {
      return Array.from(this.checked.values());
   }

   choose = action((id: EmployeeID) => {
      this.choosenID.set(id);
   });

   @computed get choosen(): Employee | undefined {
      const employee = this.data.get(this.choosenID.get());
      if (!employee) { return void 0; }
      return toJS<Employee>(employee);
   }

   deserialize = action((serialized: string) => {
      try {
         const entries = (JSON.parse(serialized) as [string, string][])
            .map(([id, ser]) => [id, Employee.from(ser)]);
         this.data.replace(entries);
      } catch (e) {
         console.error('Ошибка десериализации', e);
      }
   });

   getList(): { id: string, label: string; checked: boolean; }[] {
      return Array.from(this.data.values())
         .map(({ id, attrs }) => ({
            label: attrs['ФИО'].value,
            checked: this.checked.has(id),
            id,
         }));
   }

   private static instance: EmployeesStore;
   static getInstance(): EmployeesStore {
      return this.instance || (this.instance = new EmployeesStore());
   }
}
