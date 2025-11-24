
export type ScoreItemJSON = ReturnType<ScoreItem["toJSON"]>
class ScoreItem {
  private _min: number;
  private _max: number;
  private _student: number | null;
  private _studentDirector: number | null;
  private _comitee: number | null;
  description: string;

  constructor(min: number, max: number, description: string = "") {
    this._min = min;
    this._max = max;
    this.description = description;
    this._student = null;
    this._studentDirector = null;
    this._comitee = null;
  }

  private isScoreValid(score: number | null): boolean {
    if (!score) return true;
    return score >= this._min && score <= this._max;
  }

  public setOverallScore(score: number): void {
    this._student = score;
    this._studentDirector = score;
    this._comitee = score;
  }

  public toJSON() {
    return {
      student: this._student,
      studentDirector: this._studentDirector,
      comitee: this._comitee
    }
  }

  public set student(score: number | null) {
    if (this.isScoreValid(score)) this._student = score;
    else throw new Error(`Score must be between ${this._min} & ${this._max}`);
  }
  public get student(): number | null {
    return this._student;
  }

  public set studentDirector(score: number | null) {
    if (this.isScoreValid(score)) this._studentDirector = score;
    else throw new Error(`Score must be between ${this._min} & ${this._max}`);
  }
  public get studentDirector(): number | null {
    return this._studentDirector;
  }

  public set comitee(score: number | null) {
    if (this.isScoreValid(score)) this._comitee = score;
    else throw new Error(`Score must be between ${this._min} & ${this._max}`);
  }
  public get comitee(): number | null {
    return this._comitee;
  }

  public get min(): number {
  return this._min;
  
  }
  public get max(): number {
    return this._max;
  }
}

export default ScoreItem;