class Student {
  constructor(maSV, hoTen, ngaySinh, lopHoc, gpa) {
    this.maSV = maSV;
    this.hoTen = hoTen;
    this.ngaySinh = ngaySinh;
    this.lopHoc = lopHoc;
    this.gpa = gpa;
  }

  update(info) {
    this.hoTen = info.hoTen;
    this.ngaySinh = info.ngaySinh;
    this.lopHoc = info.lopHoc;
    this.gpa = info.gpa;
  }
}

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const emptyText = document.getElementById("emptyText");
const message = document.getElementById("message");

const maSV = document.getElementById("maSV");
const hoTen = document.getElementById("hoTen");
const ngaySinh = document.getElementById("ngaySinh");
const lopHoc = document.getElementById("lopHoc");
const gpa = document.getElementById("gpa");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const resetBtn = document.getElementById("resetBtn");
const formTitle = document.getElementById("formTitle");

let students = [];
let editingId = null;

function render() {
  table.innerHTML = "";
  emptyText.style.display = students.length ? "none" : "block";

  students.forEach((s) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.maSV}</td>
      <td>${s.hoTen}</td>
      <td>${s.ngaySinh}</td>
      <td>${s.lopHoc}</td>
      <td>${s.gpa.toFixed(2)}</td>
      <td>
        <button onclick="editStudent('${s.maSV}')">Sửa</button>
        <button onclick="deleteStudent('${s.maSV}')">Xóa</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editingId === null) {
    if (students.some((s) => s.maSV === maSV.value)) {
      message.textContent = "Mã sinh viên đã tồn tại!";
      return;
    }
    students.push(
      new Student(
        maSV.value,
        hoTen.value,
        ngaySinh.value,
        lopHoc.value,
        Number(gpa.value),
      ),
    );
    message.textContent = "Đã thêm sinh viên";
  } else {
    const s = students.find((x) => x.maSV === editingId);
    s.update({
      hoTen: hoTen.value,
      ngaySinh: ngaySinh.value,
      lopHoc: lopHoc.value,
      gpa: Number(gpa.value),
    });
    editingId = null;
    submitBtn.textContent = "Thêm";
    cancelBtn.hidden = true;
    formTitle.textContent = "Thêm sinh viên";
    maSV.disabled = false;
    message.textContent = "Đã cập nhật sinh viên";
  }

  form.reset();
  render();
});

function editStudent(id) {
  const s = students.find((x) => x.maSV === id);
  editingId = id;

  maSV.value = s.maSV;
  hoTen.value = s.hoTen;
  ngaySinh.value = s.ngaySinh;
  lopHoc.value = s.lopHoc;
  gpa.value = s.gpa;

  maSV.disabled = true;
  submitBtn.textContent = "Lưu";
  cancelBtn.hidden = false;
  formTitle.textContent = "Cập nhật sinh viên";
}

function deleteStudent(id) {
  students = students.filter((s) => s.maSV !== id);
  render();
}

cancelBtn.addEventListener("click", () => {
  editingId = null;
  form.reset();
  maSV.disabled = false;
  submitBtn.textContent = "Thêm";
  cancelBtn.hidden = true;
  formTitle.textContent = "Thêm sinh viên";
  message.textContent = "";
});

resetBtn.addEventListener("click", () => {
  form.reset();
  message.textContent = "";
});

// Render danh sách khi trang load
render();
