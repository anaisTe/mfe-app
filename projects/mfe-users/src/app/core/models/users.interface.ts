export interface IResult {
  data: IData;
}

export interface IData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
}

export interface IUser {
  id: number,
  email: string,
  first_name: string
  last_name: string,
  avatar: string,
}

export interface IUserDialog {
  dialogHeader?: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  dataForm?: IUser;
}