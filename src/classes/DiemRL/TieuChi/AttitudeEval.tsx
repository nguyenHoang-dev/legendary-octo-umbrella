import ScoreItem from "../ScoreItem";
import EvalInterface from "./EvalInterface";

// Điểm tiêu chí 1
class AttitudeEval implements EvalInterface {
  // Ý thức và thái độ trong học tập
  learningAttitude: ScoreItem;
  // Kết quả học tập trong kỳ học
  academicResults: ScoreItem;
  // Ý thức chấp hành tốt nội quy về các kỳ thi
  examCompliance: ScoreItem;
  // Ý thức và thái độ tham gia các hoạt động ngoại khóa
  extraCurricularActivities: ScoreItem;
  // Tinh thần vượt khó, phấn đấu vươn lên trong học tập
  perseverance: ScoreItem;

  constructor() {
    this.learningAttitude = new ScoreItem(0, 3, "Ý thức và thái độ trong học tập:");
    this.academicResults = new ScoreItem(0, 10, "Kết quả học tập trong kỳ học");
    this.examCompliance = new ScoreItem(-4, 4, "Ý thức chấp hành tốt nội quy về các kỳ thi");
    this.extraCurricularActivities = new ScoreItem(0, 2,
      "Ý thức và thái độ tham gia các hoạt động ngoại khóa, "
      + "các sự kiện liên quan đến nghiên cứu khoa học, học thuật, chuyên môn, Câu lạc bộ"
    )
    this.perseverance = new ScoreItem(0, 1,
      "Tinh thần vượt khó, phấn đấu vươn lên trong học tập (có ĐTBCTL học kỳ sau lớn hơn"
      + "học kỳ trước đó; đối với sinh viên năm thứ nhất, học kỳ 1 không có điểm dưới 2,5)"
    )
  }

  public *getAllScoreItems() {
    yield this.learningAttitude;
    yield this.academicResults;
    yield this.examCompliance;
    yield this.extraCurricularActivities;
    yield this.perseverance;
  }

  public get totalStudentScore(): number {
    return (
      this.learningAttitude.student +
      this.academicResults.student +
      this.examCompliance.student +
      this.extraCurricularActivities.student +
      this.perseverance.student
    )
  }

  public get totalStudentDirectorScore(): number {
    return (
      this.learningAttitude.studentDirector +
      this.academicResults.studentDirector +
      this.examCompliance.studentDirector +
      this.extraCurricularActivities.studentDirector +
      this.perseverance.studentDirector
    );
  }

  public get totalComiteeScore(): number {
    return (
      this.learningAttitude.comitee +
      this.academicResults.comitee +
      this.examCompliance.comitee +
      this.extraCurricularActivities.comitee +
      this.perseverance.comitee
    );
  }
}

export default AttitudeEval;