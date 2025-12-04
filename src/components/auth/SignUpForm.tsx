"use client"

import { countQuanTri, countSinhVien, createQuanTri, createSinhVien } from "@/app/actions/create";
import Account from "@/classes/Account/Account";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";


function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    studentYear: "2025",
    role: "Student"
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name) return;

    setIsSubmitting(true);

    switch (formData.role) {
      case "Student": {
        const studentYear = Number(formData.studentYear);
        const total = await countSinhVien();
        const msv = `B${studentYear % 2000}D${total.toString().padStart(6, '0')}`
        
        const { data, error } = await authClient.signUp.email({
          email: Account.createDefaultEmail(msv),
          password: msv,
          name: formData.name,
          role: formData.role
        })

        if (error) {
          alert(error.message);
          break;
        }

        await createSinhVien(data.user.id, studentYear, msv);
        break;
      }

      case "QuanTri": {
        const total = await countQuanTri();
        const mqt = "QT" + total.toString().padStart(6, '0');

        const { data, error } = await authClient.signUp.email({
          email: Account.createDefaultEmail(mqt),
          password: mqt,
          name: formData.name,
          role: formData.role,
        });

        if (error) {
          alert(error.message);
          break;
        }

        await createQuanTri(data.user.id, mqt);
        break;
      }

      case "Admin": {
        if (!formData.password) return;

        const { error } = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
        });

        if (error) {
          alert(error.message);
        }

        break;
      }
    }

    setIsSubmitting(false);
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
    >
      <h2>Vai trò</h2>
      <select name="role" onChange={handleChange} value={formData.role}>
        <option value={"Student"}>Sinh Viên</option>
        <option value={"QuanTri"}>Quản Trị</option>
        <option value={"Admin"}>Admin</option>
      </select>

      <h2>Tên</h2>
      <input type="text" name="name" onChange={handleChange} value={formData.name}/>

      {formData.role === "Admin" && <>
        <h2>Mất Khẩu</h2>
        <input type="text" name="password" onChange={handleChange} value={formData.password}/>

        <h2>Email</h2>
        <input type="text" name="email" onChange={handleChange} value={formData.email}/>
      </>}

      {formData.role === "Student" && <>
        <h2>Khóa học</h2>
        <select name="studentYear" onChange={handleChange} value={formData.studentYear}>
          {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </>}

      <button className="disabled:cursor-not-allowed" disabled={isSubmitting} type="submit">Submit</button>
    </form>
  )
}

export default SignUpForm;