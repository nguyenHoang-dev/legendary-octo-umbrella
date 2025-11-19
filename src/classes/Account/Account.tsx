

abstract class Account {
  protected _id: string;
  protected _email: string;
  protected _password: string;
  protected _picture: string;

  public name = '';

  constructor(id: string, name: string, email: string, password:string) {
    this._id = id;
    this.name = name;
    this._email = email;
    this._password = password;
    this._picture = "default";
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public changeEmail(value: string) {
    if (!value.includes("@")) return false;
    this._email = value;
    return true;
  }

  public checkPassword(pass: string) {
    return this._password == pass;
  }
  
  public static validatePassword(password: string) {
    return password.length >= 8;
  }

  public changePassword(newPassword: string) {
    if (Account.validatePassword(newPassword)) {
      this._password = newPassword;
      return true;
    }
    return false;
  }
}

export default Account;