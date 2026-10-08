
// ================== VERİ ==================
let students = [
  { id: "2345678092", name: "Ali Ozturk",     grade: 91 },
  { id: "6342891034", name: "Ayse Demir",     grade: 67 },
  { id: "6342854661", name: "Mustafa Kaya",   grade: 88 },
  { id: "6342854621", name: "Ali Kaya",       grade: 100 },
  { id: "6342854999", name: "Sevde Altuntas", grade: 78 }
];
let editingId = null;
const $ = (s) => document.querySelector(s);

// ================== HESAPLAMA ==================
// calculateAverage() karşılığı
function calculateAverage() {
  if (students.length === 0) return 0;
  let total = 0;
  students.forEach((s) => (total += s.grade));
  return total / students.length;
}

// ================== EKRANA ÇİZME ==================
// showStudents() karşılığı (arama kutusu da bunu çağırıyor)
function showStudents() {
  const query = $("#searchInput").value.trim();
  const list = students.filter((s) => s.id.includes(query)); // findStudent karşılığı

  $("#rows").innerHTML = list.map((s) => `
    <tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.grade}</td>
      <td>
        <button class="btn blue" onclick="openGradeBox('${s.id}')">Düzenle</button>
        <button class="btn gray" onclick="deleteStudent('${s.id}')">Sil</button>
      </td>
    </tr>`).join("");

  $("#emptyMessage").style.display = list.length > 0 ? "none" : "block";
  $("#total").textContent = students.length;
  $("#average").textContent = Number(calculateAverage().toFixed(1));
}

// ================== PENCERELER ==================
function closeBoxes() {
  $("#gradeBox").style.display = "none";
  $("#addBox").style.display = "none";
  editingId = null;
}

// ================== NOT GÜNCELLEME ==================
function openGradeBox(id) {
  const s = students.find((x) => x.id === id);
  if (!s) return;
  editingId = id;
  $("#oldGrade").textContent = s.grade;
  $("#newGrade").value = s.grade;
  $("#gradeBox").style.display = "flex";
  $("#newGrade").focus();
}

// updateGrade() karşılığı
function updateGrade() {
  const s = students.find((x) => x.id === editingId);
  const v = parseFloat($("#newGrade").value.replace(",", "."));
  if (!s) return;
  if (isNaN(v) || v < 0 || v > 100) {
    alert("0 ile 100 arasında bir not girin.");
    return;
  }
  s.grade = v;
  closeBoxes();
  showStudents();
}

// ================== SİLME ==================
function deleteStudent(id) {
  if (!confirm("Bu öğrenci silinsin mi?")) return;
  students = students.filter((s) => s.id !== id);
  showStudents();
}

// ================== YENİ ÖĞRENCİ ==================
function openAddBox() {
  $("#addId").value = "";
  $("#addName").value = "";
  $("#addGrade").value = "";
  $("#addBox").style.display = "flex";
  $("#addId").focus();
}

function addStudent() {
  const id = $("#addId").value.trim();
  const name = $("#addName").value.trim();
  const g = parseFloat($("#addGrade").value.replace(",", "."));

  if (!/^\d+$/.test(id)) { alert("ID sadece rakamlardan oluşmalı."); return; }
  if (students.some((s) => s.id === id)) { alert("Bu ID zaten kayıtlı."); return; }
  if (!name) { alert("Ad soyad boş olamaz."); return; }
  if (isNaN(g) || g < 0 || g > 100) { alert("Not 0 ile 100 arasında olmalı."); return; }

  students.push({ id, name, grade: g });
  closeBoxes();
  showStudents();
}

// ================== BAŞLANGIÇ ==================
closeBoxes();
showStudents();