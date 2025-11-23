import { ScoreItemJSON } from "@/types/jsonTypes";

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
    this._student = 0;
    this._studentDirector = 0;
    this._comitee = 0;
  }

  private isScoreValid(score: number): boolean {
    return score >= this._min && score <= this._max;
  }

  public setOverallScore(score: number): void {
    this._student = score;
    this._studentDirector = score;
    this._comitee = score;
  }

  public toJSON(): ScoreItemJSON {
    return {
      student: this._student,
      studentDirector: this._studentDirector,
      comitee: this._comitee
    }
  }

  public set student(score: number) {
    if (this.isScoreValid(score)) this._student = score;
    else throw new Error(`Score must be between ${this._min} & ${this._max}`);
  }
  public get student(): number | null {
    return this._student;
  }

  public set studentDirector(score: number) {
    if (this.isScoreValid(score)) this._studentDirector = score;
    else throw new Error(`Score must be between ${this._min} & ${this._max}`);
  }
  public get studentDirector(): number | null {
    return this._studentDirector;
  }

  public set comitee(score: number) {
    if (this.isScoreValid(score)) this._comitee = score;
    else throw new Error(`Score must be between ${this._min} & ${this._max}`);
  }
  public get comitee(): number | null {
    return this._comitee;
  }
}

export default ScoreItem;