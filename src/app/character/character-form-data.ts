export class CharacterFormData {
  constructor(
    public id: string,
    public name: string,
    public role: string,
    public house: string,
    public school: string,
    public ministryOfMagic: boolean,
    public orderOfThePhoenix: boolean,
    public dumbledoresArmy: boolean,
    public deathEater: boolean,
    public bloodStatus: string,
    public species: string,
    public boggart: string,
    public alias: string,
    public animagus: string,
    public wand: string,
    public patronus: string
  ) {}
}
