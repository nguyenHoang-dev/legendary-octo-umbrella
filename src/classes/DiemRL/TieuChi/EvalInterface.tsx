import ScoreItem from "../ScoreItem";

interface EvalInterface {
  getAllScoreItems(): Iterable<ScoreItem>;
  get totalStudentScore(): number;
  get totalStudentDirectorScore(): number;
  get totalComiteeScore(): number;
}

export default EvalInterface;