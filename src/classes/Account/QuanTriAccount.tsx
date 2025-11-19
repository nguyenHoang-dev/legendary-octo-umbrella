import Account from "./Account";


class QuanTriAccount extends Account {
  private _idClassList: string[] = [];
  
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    idClassList: string[],
  ) {
    super(id, name, email, password);
    this._idClassList = idClassList;
  }


  public get idClassList_1(): string[] {
    return this._idClassList;
  }
  public set idClassList_1(value: string[]) {
    this._idClassList = value;
  }
}

export default QuanTriAccount;