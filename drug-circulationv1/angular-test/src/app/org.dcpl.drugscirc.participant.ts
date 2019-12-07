import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.dcpl.drugscirc.participant{
   export abstract class DCPLParticipant extends Participant {
      participantKey: string;
      contact: Contact;
   }
   export class Contact {
      Fname: string;
      Lname: string;
      Email: string;
   }
   export class DCPLNetworkAdmin extends DCPLParticipant {
   }
   export class DCPLPersonnel extends DCPLParticipant {
      Department: string;
   }
   export class B2BPartner extends DCPLParticipant {
   }
// }
