import Bpnb_borgActorBase from "./actor-base.mjs";

export default class Bpnb_borgNPC extends Bpnb_borgActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.cr = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    schema.xp = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    
    return schema
  }

  prepareDerivedData() {
    this.xp = this.cr * this.cr * 100;
  }
}