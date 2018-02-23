
export class Config {

  private static _instance: Config = new Config();

  public SERVER_URL: string;

  private DB_VERSION: string = "DB_VERSION";


	constructor() {
    this.initForProduction();
  }

  static getInstance(): Config {
    return Config._instance;
  }

  initForDevelopment() {

    //this.SERVER_URL = 'http://104.130.175.190:8080/cochraneSupply';
  }

  initForProduction() {

  }

  public getDBVersion() {
    let dbVersion = localStorage.getItem(this.DB_VERSION);
     return dbVersion ? parseInt(dbVersion) : 0;
  }
  public setDBVersion(version: number) {
    localStorage.setItem(this.DB_VERSION, version.toString());
  }

}