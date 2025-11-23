import ScoreItem from "../ScoreItem";

class EvalBase<T extends Record<string, ScoreItem>> {
  protected _scores: T;

  constructor(scores: T) {
    this._scores = scores;
  }

  public get scores(): T {
    return this._scores;
  }

  public get totalStudentScore(): number {
    return Object.values(this._scores).reduce(
      (sum, score) => sum + (score.student ?? 0),
      0
    );
  }

  public get totalStudentDirectorScore(): number {
    return Object.values(this._scores).reduce(
      (sum, score) => sum + (score.studentDirector ?? 0),
      0
    );
  }

  public get totalComiteeScore(): number {
    return Object.values(this._scores).reduce(
      (sum, score) => sum + (score.comitee ?? 0),
      0
    );
  }
}

export default EvalBase;