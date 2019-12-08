import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HouseDto } from "../dto/house.dto";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HousesService {
  private readonly housePath: string = "houses";

  constructor(private http: HttpClient) {}

  fetchHousesList(): Observable<HouseDto[]> {
    let params = new HttpParams().set("key", environment.apiKey);

    return this.http.get<HouseDto[]>(environment.apiBaseUrl + this.housePath, {
      params: params
    });
  }
}
