export interface UserInterface {
  uid?: string;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  photoURL?: string;
  mp_config?: MPConfigInterface;
}

export interface MPConfigInterface {
  email?: string;
  public_key?: string;
  access_token?: string;
}
