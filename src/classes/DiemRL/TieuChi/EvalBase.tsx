import ScoreItem, { ScoreItemJSON } from "../ScoreItem";

class EvalBase<T extends Record<string, ScoreItem>> {
  protected _scores: T;

  constructor(scores: T) {
    this._scores = scores;
  }

  // Biến đổi ra dạng JSON của từng item trong key
  public toJSON() {
    const json = {} as { [K in keyof T]: ScoreItemJSON };
    for (const key in this._scores) {
      json[key] = this._scores[key].toJSON();
    }
    return json;
  }

  public get scores(): T {
    return this._scores;
  }

  public get totalStudentScore(): number {
    return Object.values(this._scores).reduce(
      (sum, score) => sum + (score.student ?? 0), 0
    );
  }

  public get totalStudentDirectorScore(): number {
    return Object.values(this._scores).reduce(
      (sum, score) => sum + (score.studentDirector ?? 0), 0
    );
  }

  public get totalComiteeScore(): number {
    return Object.values(this._scores).reduce(
      (sum, score) => sum + (score.comitee ?? 0), 0
    );
  }

  public get totalMaxScore(): number {
    return Object.values(this._scores).reduce(
      (sum, score) => sum + score.max, 0
    )
  }
}

export default EvalBase;