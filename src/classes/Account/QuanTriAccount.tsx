import Account from "./Account";

class QuanTriAccount extends Account {
  private _idClassList: string[] = [];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    idClassList: string[]
  ) {
    super(id, name, email, password);
    this._idClassList = idClassList;
  }

  public addClassID(...idClass: string[]) {
    for (const id of idClass) {
      this._idClassList.push(id);
    }
  }

  public removeClassID(...idClass: string[]) {
    this._idClassList = this._idClassList.filter(id => !idClass.includes(id))
  }

  public get idClassList(): string[] {
    return this._idClassList;
  }
  public set idClassList(value: string[]) {
    this._idClassList = value;
  }
}

export default QuanTriAccount;