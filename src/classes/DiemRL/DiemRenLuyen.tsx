

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
    if (this.validateScore(tongDiem)) 
      this.#tongDiem = tongDiem;
    else throw Error(`Score must be between 0 and 100, score is ${tongDiem}`)
  }

  private validateScore(value: number) {
    return (value >= -25) && (value <= 100);
  }

  public get tongDiem(): number {
    return this.#tongDiem;
  }
  public set tongDiem(value: number) {
    if (this.validateScore(value))
      this.#tongDiem = value;
    else throw Error(`Score must be between 0 and 100, score is ${value}`)
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