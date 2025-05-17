import { BaseService } from "../../BaseService/BaseService";
import apiClient from "../../BaseService/apiClient";
export class Search extends BaseService {
  //
  searchText = (searchText) => {
    return apiClient.get(`api/events/search?search=${searchText}`);
  };
}
export const search = new Search();
