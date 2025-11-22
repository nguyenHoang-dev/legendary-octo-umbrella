import { v4 as uuid } from "uuid";
import AttitudeEval from "./TieuChi/AttitudeEval";
import ComplianceEval from "./TieuChi/ComplianceEval";
import ParticipationEval from "./TieuChi/ParticipationEval";
import SocietalEval from "./TieuChi/SocietalEval";


class PhieuDiemRenLuyen {
  id: string;

  private _tc1: AttitudeEval;
  private _tc2: ComplianceEval;
  private _tc3: ParticipationEval;
  private _tc4: SocietalEval;

  constructor() {
    this.id = uuid();
    this._tc1 = new AttitudeEval();
    this._tc2 = new ComplianceEval();
    this._tc3 = new ParticipationEval();
    this._tc4 = new SocietalEval();
  }
}

export default PhieuDiemRenLuyen;