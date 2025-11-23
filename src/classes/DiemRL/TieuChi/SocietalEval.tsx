import ScoreItem from "../ScoreItem";
import EvalBase from "./EvalBase";

type ScoreObj = {
  // Chấp hành nghiêm chỉnh chủ trương của Đảng, chính sách, pháp luật
  lawsCompliance: ScoreItem;
  // Tích cực tham gia tuyên truyền chủ trương của Đảng, chính sách, pháp luật của Nhà nước
  lawsPublicization: ScoreItem;
  // Có mối quan hệ đúng mực với Thầy/ Cô, cán bộ, nhân viên Học viện
  superiorRespect: ScoreItem;
  // Có mối quan hệ tốt với bạn bè trong lớp và mọi người xung quanh
  humanRespect: ScoreItem;
  // Được biểu dương khen thưởng trong các hoạt động liên quan đến ý thức công dân
  goodShowing: ScoreItem;
  // Vi phạm an ninh, trật tự xã hội; an toàn giao thông
  lawsBroken: ScoreItem;
};

class SocietalEval extends EvalBase<ScoreObj> {
  constructor() {
    super({
      lawsCompliance: new ScoreItem(0, 8,
        "Chấp hành nghiêm chỉnh chủ trương của Đảng, chính sách, "
        + "pháp luật của Nhà nước, Học viện và của địa phương nơi cư trú"
      ),
      lawsPublicization: new ScoreItem(0, 5,
        "Tích cực tham gia tuyên truyền chủ trương của Đảng, chính sách, pháp luật của Nhà nước, "
        + "Học viện và quy định của địa phương nơi cư trú; có ý thức thực hiện giữ gìn vệ sinh chung"
      ),
      superiorRespect: new ScoreItem(0, 5,
        "Có mối quan hệ đúng mực với Thầy/ Cô, cán bộ, nhân viên Học viện"
      ),
      humanRespect: new ScoreItem(0, 5,
        "Có mối quan hệ tốt với bạn bè trong lớp và mọi người xung quanh; có tinh thần đoàn kết, "
        + "chia sẻ, giúp đỡ nhau trong học tập và các vấn đề khác trong cộng đồng"
      ),
      goodShowing: new ScoreItem(0, 2,
        "Được biểu dương khen thưởng trong các hoạt động liên quan "
        + "đến ý thức công dân trong quan hệ cộng đồng"
      ),
      lawsBroken: new ScoreItem(-5, 0,
        "Vi phạm an ninh, trật tự xã hội; an toàn giao thông (có giấy báo của các cơ quan hữu quan)"
      )
    })
  }
}

export default SocietalEval;