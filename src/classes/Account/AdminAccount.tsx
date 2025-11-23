import Account from "./Account";


class AdminAccount extends Account {
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
  ) {
    super(id, name, email, password);
  }
}

export default AdminAccount;