import { JKObject } from "./common";

export enum errorCodeProps {
  SYSTEM = 499,
  TOKEN_ERROR = 4,
  TOKEN_EXPIRE = 5,
}

export type ICode = string | errorCodeProps | null;

export interface IError {
  code: ICode;
  result?: JKObject | null;
}

export interface IErrorHandlerProps {
  payload: JKObject;
  jkApiName: string;
}