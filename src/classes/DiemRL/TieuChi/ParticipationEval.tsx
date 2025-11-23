import ScoreItem from "../ScoreItem";
import EvalBase from "./EvalBase";

type ScoreObj = {
  // Tham gia đầy đủ các hoạt động chính trị, xã hội
  societalEvents: ScoreItem;
  // Tham gia công tác xã hội như: hiến máu nhân đạo, ủng hộ
  charityEvents: ScoreItem;
  // Tuyên truyền tích cực hình ảnh về Trường/Khoa trên các trang mạng xã hội
  socialMedia: ScoreItem;
  // Tích cực tham gia các hoạt động phòng, chống tội phạm, các tệ nạn xã hội
  crimePreventionEvents: ScoreItem;
  // Đưa các thông tin sai lệch, thông tin chưa được kiểm chứng, đăng bình luận không chính xác
  misinformation: ScoreItem;
};

// Điểm tiêu chí 3: Tham gia các hoạt động ngoại khóa, Kỹ năng sống và hoạt động xã hội
class ParticipationEval extends EvalBase<ScoreObj> {
  constructor() {
    super({
      societalEvents: new ScoreItem(0, 10,
        "Tham gia đầy đủ các hoạt động chính trị, xã hội, các hoạt động văn hóa, văn nghệ, "
        + "thể thao, phong trào tình nguyện, các buổi sinh hoạt chuyên đề do Học viện, lớp/chi đoàn, "
        + "địa phương nơi cư trú tổ chức"
      ),
      charityEvents: new ScoreItem(0, 4,
        "Tham gia công tác xã hội như: hiến máu nhân đạo, "
        + "ủng hộ người nghèo gặp thiên tai lũ lụt và các công tác xã hội khác"
      ),
      socialMedia: new ScoreItem(0, 3, 
        "Tuyên truyền tích cực hình ảnh về Trường/Khoa trên các trang mạng xã hội"
      ),
      crimePreventionEvents: new ScoreItem(0, 3,
        "Tích cực tham gia các hoạt động phòng, chống tội phạm, các tệ nạn xã hội, "
        + "phát hiện và báo cáo kịp thời những hành vi có liên quan đến ma túy, các tệ nạn xã hội khác"
      ),
      misinformation: new ScoreItem(-10, 0, 
        "Đưa các thông tin sai lệch, thông tin chưa được kiểm chứng, đăng bình luận không "
        + "chính xác, thiếu tích cực về Học viện/ Khoa/ ngành đang học."
      )
    })
  }
}

export default ParticipationEval;