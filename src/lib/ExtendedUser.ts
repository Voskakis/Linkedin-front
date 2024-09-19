import { AdapterUser } from "next-auth/adapters";


export default interface ExtendedUser extends AdapterUser {
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  BioFileId?: number | null;
  PhotoFileId?: number | null;
}
