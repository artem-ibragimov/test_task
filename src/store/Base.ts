import { action, computed, observable, ObservableMap } from 'mobx';
import { ISerializable } from 'src/core/Serialize';
import LS from 'src/storage/Local';


export default class BaseStore<T extends { id: string; } & ISerializable> implements ISerializable {
   protected data: ObservableMap<string, T> = observable.map(new Map());
   protected STORAGE_KEY = 'BaseStore';

   constructor() {
      this.store = this.store.bind(this);
      this.restore = this.restore.bind(this);
   }

   add = action((item: T): void => {
      this.data.set(item.id, item);
   });

   delete = action((ids: string[]) => {
      ids.forEach((id) => { this.data.delete(id); });
   });

   getAll(): [string, T][] {
      return Array.from(this.data.entries());
   }

   serialize() {
      const entries = Array.from(this.data.entries()).map(([id, entity]) => [id, entity.serialize()]);
      return JSON.stringify(entries);
   }

   deserialize = action((serialized: string) => {
      try {
         const entries = JSON.parse(serialized);
         this.data.replace(entries);
      } catch (e) {
         console.error('Ошибка десериализации', e);
      }
   });

   @computed get changesStored(): boolean {
      return LS.getInstance().isActual(this.STORAGE_KEY, this);
   }

   store() {
      LS.getInstance().store(this.STORAGE_KEY, this);
   }

   restore() {
      LS.getInstance().restore(this.STORAGE_KEY, this);
   }
}
