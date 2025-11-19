import { v4 as uuid } from "uuid";


class PhieuDiemRenLuyen {
  id: string;

  tc1: any;
  tc2: any;
  tc3: any;
  tc4: any;

  constructor() {
    this.id = uuid();
  }
}

export default PhieuDiemRenLuyen;