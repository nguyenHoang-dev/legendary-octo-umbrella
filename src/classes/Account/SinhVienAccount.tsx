import Account from "./Account";


class SinhVienAccount extends Account {
  private _msv: string;
  private _idClass: string;
  private _idPhieuDiemRenLuyen: string;
  
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    maSinhVien: string,
    idClass: string,
    idPhieuDiemRenLuyen: string,
  ) {
    super(id, name, email, password);
    this._msv = maSinhVien;
    this._idClass = idClass;
    this._idPhieuDiemRenLuyen = idPhieuDiemRenLuyen;
  }


  public get msv(): string {
    return this._msv;
  }
  public set msv(value: string) {
    this._msv = value;
  }

  public get idClass(): string {
    return this._idClass;
  }
  public set idClass(value: string) {
    this._idClass = value;
  }

  public get idPhieuDiemRenLuyen(): string {
    return this._idPhieuDiemRenLuyen;
  }
  public set idPhieuDiemRenLuyen(value: string) {
    this._idPhieuDiemRenLuyen = value;
  }
}

export default SinhVienAccount;