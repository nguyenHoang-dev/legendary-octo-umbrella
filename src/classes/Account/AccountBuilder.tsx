import { v4 as uuid } from "uuid";
import SinhVienAccount from "./SinhVienAccount";
import QuanTriAccount from "./QuanTriAccount";

type AccountRole = "Student" | "Admin"

// Class xây dựng tài khoản
class AccountBuilder {
  // Account
  private _id: string = uuid();
  private _email!: string;
  private _name!: string;
  private _password!: string;
  private _accountRole: AccountRole = "Student";
  // Student
  private _msv?: string;
  private _idClass?: string;
  private _idPhieuDiemRenLuyen?: string;
  private _isCanSu: boolean = false;
  // QuanTri
  private _idClassList: string[] = [];

  // Account
  public setEmail(email: string) {
    if (!email.includes("@")) throw new Error("Invalid Email");
    this._email = email;
    return this;
  }
  public setName(name: string) {
    this._name = name;
    return this;
  }
  public setPassword(password: string) {
    this._password = password;
    return this;
  }
  public setAccountRole(role: AccountRole) {
    this._accountRole = role;
    return this;
  }

  // Student
  public setMSV(msv: string) {
    this._msv = msv;
    return this;
  }
  public setClass(idClass: string) {
    this._idClass = idClass;
    return this;
  }
  public setPhieuRenLuyen(idPhieuDiemRenLuyen: string) {
    this._idPhieuDiemRenLuyen = idPhieuDiemRenLuyen;
    return this;
  }
  public setCanSu(value: boolean) {
    this._isCanSu = value;
    return this;
  }

  // Quan Tri
  public addClassID(idClass: string | string[]) {
    if (typeof idClass === 'string')
      this._idClassList.push(idClass);
    else {
      for (const id of idClass) {
        this._idClassList.push(id);
      }
    }
    return this;
  }

  // Building
  public build() {
    switch (this._accountRole) {
      case "Student": {
          if (
            this._msv
            && this._idClass
            && this._idPhieuDiemRenLuyen
          ) 
            return new SinhVienAccount(
              this._id,
              this._name,
              this._email,
              this._password,
              this._msv,
              this._idClass,
              this._idPhieuDiemRenLuyen,
              this._isCanSu
            );
          else throw new Error("Missing data");
        }

      case "Admin": {
        return new QuanTriAccount(
          this._id,
          this._name,
          this._email,
          this._password,
          this._idClassList
        )
      }
      
      default: throw new Error("Unable to create class")
    }
  }
}

export default AccountBuilder;