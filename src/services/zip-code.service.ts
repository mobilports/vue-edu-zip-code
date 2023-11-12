import axios from "axios-observable";
import { AxiosObservable } from "axios-observable";
import { FetchSettlementsForZipCodeResponse } from "../interfaces/fetch-settlement-for-zip-code-response";

export class ZipCodeService {
  readonly baseUrl = "http://localhost:3000/zip-code/";

  fetchSettlementsForZipCode(
    zipCode: string
  ): AxiosObservable<FetchSettlementsForZipCodeResponse> {
    return axios.get<FetchSettlementsForZipCodeResponse>(
      `${this.baseUrl}${zipCode}`
    );
  }
}
