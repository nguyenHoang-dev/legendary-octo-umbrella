import AttitudeEval from "./TieuChi/AttitudeEval";
import ComplianceEval from "./TieuChi/ComplianceEval";
import ParticipationEval from "./TieuChi/ParticipationEval";
import SocietalEval from "./TieuChi/SocietalEval";
import DiemRenLuyen from "./DiemRenLuyen";

class PhieuDiemRenLuyen {
  private _id: string;
  private _hocKy: 1 | 2;
  private _namHoc: number;
  
  private _tc1: AttitudeEval;
  private _tc2: ComplianceEval;
  private _tc3: ParticipationEval;
  private _tc4: SocietalEval;
  
  constructor(id: string, hocKy: 1 | 2, namHoc: number) {
    this._id = id;
    this._hocKy = hocKy;
    this._namHoc = namHoc;
    this._tc1 = new AttitudeEval();
    this._tc2 = new ComplianceEval();
    this._tc3 = new ParticipationEval();
    this._tc4 = new SocietalEval();
  }
  
  // TODO func cho tạo lại class từ dữ liệu db
  public static rebuildFromJSON;
  
  // Lấy dạng JSON để lưu trữ
  public toJSON() {
    return {
      attitudeEval: this._tc1.toJSON(),
      complianceEval: this._tc2.toJSON(),
      participationEval: this._tc3.toJSON(),
      societalEval: this._tc4.toJSON()
    }
  }

  public get studentJudge() {
    return new DiemRenLuyen(
      this._tc1.totalStudentScore +
      this._tc2.totalStudentScore +
      this._tc3.totalStudentScore +
      this._tc4.totalStudentScore +
      10
    )
  }
  
  public get studentDirectorJudge() {
    return new DiemRenLuyen(
      this._tc1.totalStudentDirectorScore +
      this._tc2.totalStudentDirectorScore +
      this._tc3.totalStudentDirectorScore +
      this._tc4.totalStudentDirectorScore +
      10
    )
  }
  
  public get comiteeJudge() {
    return new DiemRenLuyen(
      this._tc1.totalComiteeScore +
      this._tc2.totalComiteeScore +
      this._tc3.totalComiteeScore +
      this._tc4.totalComiteeScore +
      10
    )
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

  public get attitudeEval() {
    return this._tc1;
  }
  
  public get complianceEval() {
    return this._tc2;
  }

  public get participationEval() {
    return this._tc3;
  }

  public get societalEval() {
    return this._tc4;
  }
}

export default PhieuDiemRenLuyen;