export interface UserInterface {
  uid?: string;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  photoURL?: string;
}

export interface MPConfigInterface {
  id?: string;
  email?: string;
  public_key?: string;
  access_token?: string;
}
