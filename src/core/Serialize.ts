export interface ISerializable {
   serialize(): string;
}
export interface IDeserializable {
   deserialize(s: string): void;
}