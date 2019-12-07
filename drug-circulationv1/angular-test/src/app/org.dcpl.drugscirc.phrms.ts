import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Drugs} from './org.dcpl.drugscirc.drugs';
// export namespace org.dcpl.drugscirc.phrms{
   export class Pharma extends Asset {
      PharmaID: string;
      route: Route;
      Name: string[];
      drugs: Drugs;
   }
   export class Route {
      Origin: string;
      Destination: string;
      Schedule: Date;
   }
   export class CreatePharma extends Transaction {
      Name: string[];
      Origin: string;
      Destination: string;
      Schedule: Date;
   }
   export class PharmaCreated extends Event {
      PharmaID: string;
   }
// }
