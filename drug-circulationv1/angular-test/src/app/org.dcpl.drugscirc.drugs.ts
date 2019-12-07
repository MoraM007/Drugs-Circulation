import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.dcpl.drugscirc.drugs{
   export class Drugs extends Asset {
      drugId: string;
      Owner: string;
      OwnershipType: Ownership;
      Name: string;
      price: number;
      Description: string;
      prescription: string;
      SideEffects: string;
      Expire: Date;
   }
   export enum Ownership {
      TPARTY,
      OWNED,
   }
// }
