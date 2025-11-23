import ScoreItem from "../ScoreItem";
import EvalBase from "./EvalBase";

type ScoreObj = {
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
}

// Điểm tiêu chí 1: Ý thức học tập
class AttitudeEval extends EvalBase<ScoreObj> {

  constructor() {
    super({
      learningAttitude: new ScoreItem(0, 3, "Ý thức và thái độ trong học tập:"),
      academicResults: new ScoreItem(0, 10, "Kết quả học tập trong kỳ học"),
      examCompliance: new ScoreItem(-4, 4, "Ý thức chấp hành tốt nội quy về các kỳ thi"),
      extraCurricularActivities: new ScoreItem(0, 2,
        "Ý thức và thái độ tham gia các hoạt động ngoại khóa, "
        + "các sự kiện liên quan đến nghiên cứu khoa học, học thuật, chuyên môn, Câu lạc bộ"
      ),
      perseverance: new ScoreItem(0, 1,
        "Tinh thần vượt khó, phấn đấu vươn lên trong học tập (có ĐTBCTL học kỳ sau lớn hơn"
        + "học kỳ trước đó; đối với sinh viên năm thứ nhất, học kỳ 1 không có điểm dưới 2,5)"
      ),
    });
  }
}

export default AttitudeEval;