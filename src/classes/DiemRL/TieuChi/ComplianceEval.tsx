import ScoreItem from "../ScoreItem";
import EvalBase from "./EvalBase";

type ScoreObj = {
  // Thực hiện nghiêm túc các nội quy, quy chế
  schoolRules: ScoreItem;
  // Thực hiện quy định về công tác nội trú, ngoại trú
  homeSubmission: ScoreItem;
  // Thực hiện nghiêm túc các buổi họp lớp/ sinh hoạt đoàn thể
  schoolMeetings: ScoreItem;
  // Tham gia các buổi hội thảo việc làm, định hướng nghề nghiệp
  workshopParticipation: ScoreItem;
};

// Điểm tiêu chí 2: Ý thức chấp hành nội quy, quy định
class ComplianceEval extends EvalBase<ScoreObj> {

  constructor() {
    super({
      schoolRules: new ScoreItem(0, 15,
        "Thực hiện nghiêm túc các nội quy, quy chế, các quy định hiện hành trong Học viện."
      ),
      homeSubmission: new ScoreItem(-5, 0,
        "Thực hiện quy định về công tác nội trú, ngoại trú"
      ),
      schoolMeetings: new ScoreItem(0, 5,
        "Thực hiện nghiêm túc các buổi họp lớp/ sinh hoạt đoàn thể do Học viện/Khoa/Viện, CVHT, "
        + "Lớp/Chi đoàn tổ chức (tùy thuộc vào số buổi tổ chức sinh hoạt, họp)"
      ),
      workshopParticipation: new ScoreItem(0, 5,
        "Tham gia các buổi hội thảo việc làm, định hướng nghề nghiệp do Học viện tổ chức"
      )
    })
  }
}

export default ComplianceEval;