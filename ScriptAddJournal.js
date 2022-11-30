const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Journal";
    addBtn.innerText = "Add Journal";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p tabindex="2">${note.title}</p>
                            <span tabindex="2">${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span tabindex="2" >${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h" tabindex="2"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}



function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});

function bg(btnGrpId) {
    var bgGroupId = btnGrpId;
    var selClass = "btn-sel";
    var bgVal = parseInt(document.getElementById(bgGroupId).getAttribute("data-bgval"));
	var bgVal2 = parseInt(document.getElementById(bgGroupId).getAttribute("data-bgval2"));
    //Create event listeners for the child buttons
    document.getElementById(btnGrpId).addEventListener("click", function (e) {
        var el = e.target || e.srcElement;
        if (el && el.nodeName == "BUTTON") {
            if (el.classList.contains(selClass)) {
                el.classList.remove(selClass);
                bgVal -= parseInt(el.value);
            } else {
                el.classList.add(selClass);
                bgVal += parseInt(el.value);
            }
            el.parentNode.setAttribute("data-bgval", bgVal);
        }
    });


    //Public function for getting and setting the current value
    this.value = function (daysVal) {
        //Apply preset bgval days
        //Set all to unselected to start with
        if(daysVal !== null && daysVal !== undefined){
            var elmts = document.getElementById(btnGrpId).children;
            for (var i = 0; i < elmts.length; i++) {
                var dayVal = parseInt(elmts[i].value);
                if ((dayVal & daysVal) == dayVal) { //use bitwise to see if current day bit is set
                    elmts[i].classList.add(selClass);
                } else {
                    elmts[i].classList.remove(selClass);
                }
            }
        }
        return bgVal;
    }

    this.value(bgVal);

};

var mybg = new bg('divButtonGroup');
var mybg = new bg('divButtonGroup2');

function updateValue(){
  document.getElementById("spanVal").innerHTML = mybg.value();
}

function setVal(){
  var val = parseInt(document.getElementById('txtInput').value);
  mybg.value(val);
}

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
