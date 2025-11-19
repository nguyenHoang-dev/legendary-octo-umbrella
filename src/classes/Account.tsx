

class Account {
  #email: string;
  #password: string;
  #picture: string;

  name = '';

  constructor(name: string, email: string, password:string) {
    this.name = name;
    this.#email = email;
    this.#password = password;
    this.#picture = "default";
  }

  public get email(): string {
    return this.#email;
  }

  public changeEmail(value: string) {
    this.#email = value;
  }

  public checkPassword(pass: string) {
    return this.#password == pass;
  }
  
  public static validatePassword(password: string) {
    return password.length >= 8;
  }

  public changePassword(newPassword: string) {
    if (Account.validatePassword(newPassword)) {
      this.#password = newPassword;
      return true;
    }
    return false;
  }
}

export default Account;