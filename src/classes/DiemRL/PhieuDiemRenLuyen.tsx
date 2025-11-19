import { v4 as uuid } from "uuid";


class PhieuDiemRenLuyen {
  id: string;

  tc1: AttitudeEval;
  tc2: ComplianceEval;
  tc3: ParticipationEval;
  tc4: SocietalEval;

  constructor() {
    this.id = uuid();
  }
}

export default PhieuDiemRenLuyen;