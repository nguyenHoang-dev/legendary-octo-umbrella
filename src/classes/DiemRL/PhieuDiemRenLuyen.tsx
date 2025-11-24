import AttitudeEval from "./TieuChi/AttitudeEval";
import ComplianceEval from "./TieuChi/ComplianceEval";
import ParticipationEval from "./TieuChi/ParticipationEval";
import SocietalEval from "./TieuChi/SocietalEval";
import DiemRenLuyen from "./DiemRenLuyen";
import EvalBase from "./TieuChi/EvalBase";
import ScoreItem, { ScoreItemJSON } from "./ScoreItem";

// type object tạo ra bởi toJSON
export type PhieuRenLuyenJSON = ReturnType<PhieuDiemRenLuyen["toJSON"]>

class PhieuDiemRenLuyen {
  private _id: string;
  private _hocKy: 1 | 2;
  private _namHoc: number;
  // Tất cả các tiêu chí object
  private _tc: {
    attitudeEval: AttitudeEval,
    complianceEval: ComplianceEval,
    participationEval: ParticipationEval,
    societalEVal: SocietalEval
  }
  
  constructor(id: string, hocKy: 1 | 2, namHoc: number) {
    this._id = id;
    this._hocKy = hocKy;
    this._namHoc = namHoc;
    this._tc = {
      attitudeEval: new AttitudeEval(),
      complianceEval: new ComplianceEval(),
      participationEval: new ParticipationEval(),
      societalEVal: new SocietalEval(),
    }
  }
  // TODO func cho tạo lại class từ dữ liệu db
  public static rebuildFromJSON(json: PhieuRenLuyenJSON) {
    const newInstance = new PhieuDiemRenLuyen(json.id, json.hocKy, json.namHoc);

    for (const key in newInstance.tc) {
      PhieuDiemRenLuyen.applyScoresFromJSON(newInstance.tc[key], json[key]);
    }

    return newInstance;
  }
  // Helper để nhập điểm của tiêu chí từ json
  public static applyScoresFromJSON(
    evalObj: EvalBase<Record<string, ScoreItem>>,
    json: Record<string, ScoreItemJSON>
  ) {
    for (const key in json) {
      const scoreItem = evalObj.scores[key];
      const jsonItem = json[key];

      if (!scoreItem) continue;

      scoreItem.student = jsonItem.student;
      scoreItem.studentDirector = jsonItem.studentDirector;
      scoreItem.comitee = jsonItem.comitee;
    }
  }
  
  // Lấy dạng JSON để lưu trữ
  public toJSON() {
    return {
      id: this._id,
      hocKy: this._hocKy,
      namHoc: this._namHoc,
      ...this.toEvalJSON()
    }
  }

  // Lấy điẻm theo dạng JSON để sử dụng
  public toEvalJSON() {
    return {
      attitudeEval: this._tc.attitudeEval.toJSON(),
      complianceEval: this._tc.complianceEval.toJSON(),
      participationEval: this._tc.participationEval.toJSON(),
      societalEval: this._tc.societalEVal.toJSON(),
    };
  }

  public get studentJudge() {
    const sum = Object.values(this.tc).reduce(
      (sum, tc) => (sum + tc.totalStudentScore), 0
    )
    return new DiemRenLuyen(sum + 10);
  }
  
  public get studentDirectorJudge() {
    const sum = Object.values(this.tc).reduce(
      (sum, tc) => (sum + tc.totalStudentDirectorScore), 0
    )
    return new DiemRenLuyen(sum + 10);
  }
  
  public get comiteeJudge() {
    const sum = Object.values(this.tc).reduce(
      (sum, tc) => (sum + tc.totalComiteeScore), 0
    )
    return new DiemRenLuyen(sum + 10);
  }
  
  public get id() {
    return this._id;
  }
  
  public get hocKy(): number {
    return this._hocKy;
  }
  public set hocKy(value: 1 | 2) {
    this._hocKy = value;
  }

  public get namHoc(): number {
    return this._namHoc;
  }
  public set namHoc(value: number) {
    this._namHoc = value;
  }

  public get tc() {
    return this._tc;
  }
}

export default PhieuDiemRenLuyen;