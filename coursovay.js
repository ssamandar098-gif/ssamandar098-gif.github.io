// Получаем элементы DOM
let fio = document.querySelector(".FIO");
let con = document.querySelector(".CON");
let job = document.querySelector(".yesJob");
let ad = document.querySelector(".yesAd");
let aboutMe = document.querySelector(".aboutMe");
let photo = document.querySelector(".photo");
let noJobCheckbox = document.querySelector(".noJob");

let sbtn = document.querySelector(".submit");
let roleBtn = document.querySelector(".role");
let select = document.querySelector(".select");

// Функция для роли Инженер
function qwertyuo(fio, con) {
  return `
        <div class="result-container">
            <h1 style="color: #667eea;">Привет, Инженер ${fio || ""}</h1>
            <h2>Тут сбываются мечты</h2>
            <p><strong>Контакты:</strong> ${con || "не указаны"}</p>
            <button onclick="location.reload()">Заполнить заново</button>
        </div>
    `;
}

// Функция для создания страницы результата
function createResultPage(title, color, fd) {
  return `
        <div class="result-container">
            <h1 style="color: ${color};">Привет, ${title}</h1>
            <h2>Тут сбываются мечты</h2>
            ${fd.photo ? `<img src="${fd.photo}" alt="Фото">` : '<p style="color: #999;">Фото не загружено</p>'}
            <p><strong>ФИО:</strong> ${fd.fio || "не указано"}</p>
            <p><strong>Контакты:</strong> ${fd.con || "не указаны"}</p>
            <p><strong>Навыки:</strong> ${fd.q || "не указаны"}</p>
            <p><strong>Опыт работы:</strong> ${fd.w || "не указан"}</p>
            <p><strong>О себе:</strong> ${fd.feeo || "не указано"}</p>
            <p><strong>Нет опыта:</strong> ${fd.r ? "Да" : "Нет"}</p>
            <button onclick="location.reload()">Заполнить заново</button>
        </div>
    `;
}

// Кнопка "Показать выбранную роль"
if (roleBtn) {
  roleBtn.addEventListener("click", () => {
    alert(`Выбрана должность: ${select ? select.value : "не выбрана"}`);
    console.log(`Текущая роль: ${select ? select.value : "не выбрана"}`);
  });
}

// Основная логика отправки
if (sbtn) {
  sbtn.addEventListener("click", () => {
    // Собираем все данные в объект fd
    let fd = {
      fio: fio?.value || "",
      con: con?.value || "",
      q: ad?.value || "",
      w: job?.value || "",
      feeo: aboutMe?.value || "",
      r: noJobCheckbox?.checked || false,
      t: "",
      photo: "",
      photoName: "",
      select: select?.value || "",
    };

    // Обработка фото
    if (photo?.files && photo.files[0]) {
      fd.photo = URL.createObjectURL(photo.files[0]);
      fd.photoName = photo.files[0].name;
    }

    console.log("Отправленные данные:", fd);

    // Проверка заполнения обязательных полей
    if (!fd.fio) {
      alert("Пожалуйста, заполните ФИО");
      fio?.focus();
      return;
    }

    if (!fd.con) {
      alert("Пожалуйста, заполните контакты");
      con?.focus();
      return;
    }

    // Рендер в зависимости от выбранной роли
    switch (fd.select) {
      case "Инженер":
        document.body.innerHTML = qwertyuo(fd.fio, fd.con);
        break;
      case "ПРОГРАММИСТ":
        document.body.innerHTML = createResultPage(
          "ПРОГРАММИСТ",
          "#28a745",
          fd,
        );
        break;
      case "БУХГАЛТЕР":
        document.body.innerHTML = createResultPage("БУХГАЛТЕР", "#dc3545", fd);
        break;
      default:
        document.body.innerHTML = createResultPage(
          fd.select || "Гость",
          "#667eea",
          fd,
        );
        break;
    }
  });
}

// Обработка чекбокса "Нет опыта работы"
if (noJobCheckbox && job) {
  noJobCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      job.disabled = true;
      job.value = "";
      job.placeholder = 'Опыт не требуется (отмечено "Нет опыта")';
    } else {
      job.disabled = false;
      job.placeholder = "Опишите ваш опыт работы...";
    }
  });

  // Инициализация состояния чекбокса при загрузке
  if (noJobCheckbox.checked) {
    job.disabled = true;
    job.placeholder = 'Опыт не требуется (отмечено "Нет опыта")';
  }
}
