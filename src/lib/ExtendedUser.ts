export default interface UserExtension {
  FirstName?: string;
  LastName?: string;
  PhoneNumber?: string;
  BioFileId?: number | null;
  PhotoFileId?: number | null;
  AccessToken?: string;
  Email?: string;
}