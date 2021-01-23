import { IDeserializable, ISerializable } from 'src/core/Serialize';

export default class LS {
   store(key: string, entity: ISerializable) {
      localStorage && localStorage.setItem(key, entity.serialize());
   }

   restore(key: string, entity: IDeserializable): void {
      const ser = this.getStored(key);
      if (!ser) { return; }
      entity.deserialize(ser);
   }

   isActual(key: string, entity: ISerializable): boolean {
      return this.getStored(key) === entity.serialize();
   }

   private getStored(key: string) {
      return localStorage && localStorage.getItem(key);
   }

   private static instance: LS;

   static getInstance(): LS {
      return this.instance || (this.instance = new LS());
   }
}