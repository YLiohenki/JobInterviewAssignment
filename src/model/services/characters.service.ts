import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CharacterDto } from "../dto/character.dto";

@Injectable({
  providedIn: "root"
})
export class CharactersService {
  private readonly charactersPath: string = "characters";

  constructor(private http: HttpClient) {}

  fetchCharactersList(): Observable<CharacterDto[]> {
    let params = new HttpParams().set("key", environment.apiKey);

    return this.http.get<CharacterDto[]>(
      environment.apiBaseUrl + this.charactersPath,
      {
        params: params
      }
    );
  }
}
