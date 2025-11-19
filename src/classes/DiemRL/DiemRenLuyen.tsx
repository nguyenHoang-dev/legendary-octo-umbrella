

// type BangDiem = {
//   tc1: {
//     1: number;
//     2: number;
//     3: number;
//     4: number;
//     5: number;
//   };
//   tc2: {
//     1: number;
//     2: number;
//     3: number;
//     4: number;
//   };
//   tc3: {
//     1: number;
//     2: number;
//     3: number;
//     4: number;
//   };
//   tc4: {
//     1: number;
//     2: number;
//     3: number;
//     4: number;
//     5: number;
//     6: number;
//   }
// }

class DiemRenLuyen {
  #tongDiem: number;

  constructor(tongDiem: number) {
    this.#tongDiem = tongDiem;
  }

  public get tongDiem(): number {
    return this.#tongDiem;
  }
  public set tongDiem(value: number) {
    this.#tongDiem = value;
  }

  public get xepLoai(): string {
    if (this.#tongDiem >= 90) return "Xuất sắc";
    else if (this.#tongDiem >= 80) return "Tốt";
    else if (this.#tongDiem >= 65) return "Khá";
    else if (this.#tongDiem >= 50) return "Trung bình";
    else return "Yếu";
  }
}


export default DiemRenLuyen;