import { originalData } from "./weeks.js";
let updatedData = { ...originalData };
const weeks = document.querySelector("#weeks");
const dropDown1 = document.querySelector("#dropdown1Item");
const dropDown2 = document.querySelector("#dropdown2Item");

function displayOriginalData(data) {
  loadContent(data);
}

displayOriginalData(originalData);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function resetContent() {
  document.querySelector(".inputText").value = "";
  removeAllChildNodes(weeks);
  removeAllChildNodes(dropDown1);
  removeAllChildNodes(dropDown2);
  when.innerText = `"order"`;
  when.style.opacity = 0.5;
  which.innerText = `"week"`;
  which.style.opacity = 0.5;
}

function clickEvents(data) {
  document.querySelectorAll(".nav-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var title = this.lastChild.innerHTML;
      var ele = document.createElement("h3");
      ele.setAttribute("class", "weekTitle");
      ele.innerHTML = title;
      document.querySelector("#leftDiv").replaceChildren("", ele);
      document.querySelector("#weekContent").innerHTML = "";
      data.weeks.forEach(function (item) {
        if (title.slice(4, 6) == item.week_number) {
          item.modules.forEach(function (item) {
            document.querySelector("#weekContent").innerHTML += `<ul>
              <li>${item.name}</li>
              </ul>`;
          });
        }
      });
    });
  });
}

function setDefaultOptions() {
  var defaultOption = document.createElement("option");
  defaultOption.setAttribute("class", "dropdown-item");
  defaultOption.selected = true;
  defaultOption.hidden = true;
  defaultOption.innerHTML = "Week";
  dropDown2.appendChild(defaultOption);

  var defaultOption2 = document.createElement("option");
  defaultOption2.setAttribute("class", "dropdown-item");
  defaultOption2.selected = true;
  defaultOption2.hidden = true;
  defaultOption2.innerHTML = "Order";
  dropDown1.appendChild(defaultOption2);
}

function loadContent(data) {
  setDefaultOptions();
  for (var i = 0; i < data.weeks.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("class", "nav-item");
    var a = document.createElement("a");
    a.setAttribute("class", "nav-link");
    a.href = "#";
    a.innerHTML = `Week ${data.weeks[i].week_number}`;
    li.appendChild(a);
    weeks.appendChild(li);

    var option = document.createElement("option");
    option.setAttribute("class", "dropdown-item");
    option.innerHTML = `Week ${data.weeks[i].week_number}`;
    dropDown2.appendChild(option);
  }

  const arr = ["Before", "After"];
  arr.forEach(function (item) {
    var option = document.createElement("option");
    option.setAttribute("class", "dropdown-item");
    option.innerHTML = `${item}`;
    dropDown1.appendChild(option);
  });

  clickEvents(updatedData);
}

function newDataObj(data, toDo, weekNumber) {
  const newData = {
    id: data.weeks.length + 1,
    week_number: weekNumber,
    modules: [
      {
        id: `mod1`,
        name: `${toDo}`,
      },
    ],
  };

  return newData;
}

function submitForm(toDo, when, which, data) {
  if (which == `"week"` || when == `"order"` || toDo == `''`) {
    alert("Please select order or week number or input field is empty");
  } else {
    if (when == "After") {
      var i = 0;
      if (which.slice(4, 6) == data.weeks.length) {
        data.weeks.splice(
          data.weeks.length + 1,
          0,
          newDataObj(data, toDo, data.weeks.length + 1)
        );
      } else {
        while (data.weeks[i].week_number != which.slice(4, 6)) {
          i++;
        }
        data.weeks.splice(i + 1, 0, newDataObj(data, toDo, i + 1));
        while (i < data.weeks.length) {
          data.weeks[i].week_number = i + 1;
          i++;
        }
      }
    } else {
      var i = 0;
      if (which.slice(4, 6) == 1) {
        data.weeks.splice(0, 0, newDataObj(data, toDo, 1));
      } else {
        while (data.weeks[i].week_number != which.slice(4, 6) - 1) {
          i++;
        }
        data.weeks.splice(i + 1, 0, newDataObj(data, toDo, i + 1));
      }
      while (i < data.weeks.length) {
        data.weeks[i].week_number = i + 1;
        i++;
      }
    }
  }
  return data;
}

document.querySelector("#formSubmit").addEventListener("submit", (event) => {
  event.preventDefault();
  var inputValue = document.querySelector(".inputText").value;
  updatedData = submitForm(
    inputValue,
    when.innerText,
    which.innerText,
    originalData
  );
  resetContent();
  loadContent(updatedData);
});

const showCard = document.querySelector("#addWeekBtn");
const cardBox = document.querySelector("#card");

showCard.addEventListener("click", function () {
  cardBox.style.visibility = "visible";
});

document.addEventListener("click", function (event) {
  const isClickInsideCard = cardBox.contains(event.target);
  if (event.target != showCard) {
    if (!isClickInsideCard) {
      cardBox.style.visibility = "hidden";
    }
  }
});

const selectElem1 = document.querySelector(".menu1");
const when = document.querySelector("#when");
selectElem1.addEventListener("change", () => {
  when.innerText = selectElem1.value;
  when.style.opacity = 1;
});

const selectElem2 = document.querySelector(".menu2");
const which = document.querySelector("#which");
selectElem2.addEventListener("change", () => {
  which.innerText = selectElem2.value;
  which.style.opacity = 1;
});
