

class ScoreItem {
  min: number;
  max: number;
  private _student: number;
  private _studentDirector: number;
  private _comitee: number;
  description: string;

  constructor(min: number, max: number, description: string = "") {
    this.min = min;
    this.max = max;
    this.description = description;
    this._student = 0;
    this._studentDirector = 0;
    this._comitee = 0;
  }

  private isScoreValid(score: number): boolean {
    return score >= this.min && score <= this.max;
  }

  public set student(score: number) {
    if (this.isScoreValid(this._student)) this._student = score;
    else throw new Error(`Score must be between ${this.min} & ${this.max}`);
  }
  public get student(): number {
    return this._student;
  }

  public set studentDirector(score: number) {
    if (this.isScoreValid(this._studentDirector)) this._studentDirector = score;
    else throw new Error(`Score must be between ${this.min} & ${this.max}`);
  }
  public get studentDirector(): number {
    return this._student;
  }

  public set comitee(score: number) {
    if (this.isScoreValid(this._comitee)) this._comitee = score;
    else throw new Error(`Score must be between ${this.min} & ${this.max}`);
  }
  public get comitee(): number {
    return this._student;
  }
}

export default ScoreItem;