export type AuthData = {
  login: string,
  password: string,
}

export type UserData = {
  id: string,
  email: string,
  name: string,
  avatarUrl: string,
  isPro: boolean,
  token: string,
}

export type AuthDataType = {
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

export type CommentFormDataType = { rating: number | null, comment: string };
