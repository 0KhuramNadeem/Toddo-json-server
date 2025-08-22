const search_bar = document.querySelector(".search-bar");
const save_button = document.querySelector(".save-button");
const append_list = document.querySelector(".append_list");
const work_list = document.querySelector(".work-list");
const edit = document.querySelector(".edit");
const update_text = document.querySelector(".update-text");
const update_description = document.querySelector(".update-description");
const update_button = document.querySelector(".update-button");
const count = document.querySelector(".count");
const clear_button = document.querySelector(".clear-button");
const description = document.querySelector(".description");
const cancel_update = document.querySelector(".cancel-update");
const del_button = document.querySelector(".del-button");
const del_popup = document.querySelector(".del-popup");
const cancel_button = document.querySelector(".cancel-button");
const details = document.querySelector(".details");
const title = document.querySelector(".title");
const cancel = document.querySelector(".cancel");
// console.log(myArr);
let myArr = [];

myArr = JSON.parse(localStorage.getItem("tasks"));
console.log(myArr);
let id_counter = 0;
id_counter = localStorage.getItem("counter")

const update = (item) => {
    edit.style.visibility = 'visible';
    update_text.value = item.title;

    update_description.value = item.description;
    if (update_description.value === "") {
        update_description.value = "No Description Availible"
    }

    update_button.addEventListener("click", (event) => {
        if (update_text.value === "") {
            update_text.value = "";
            edit.style.visibility = 'hidden';
            return;
        }
        let new_val = update_text.value;
        const index = myArr.indexOf(item);
        myArr[index] = new_val;
        updateTask();
        update_text.value = "";
        update_description.value = ""
        edit.style.visibility = 'hidden';
    });
}
const delItem = (item) => {
    del_popup.style.visibility = "visible";
    del_button.addEventListener("click", (event) => {
        const index = myArr.indexOf(item);
        console.log(index);
        if (index > -1) {
            myArr.splice(index, 1);
            updateTask();
        }
        del_popup.style.visibility = "hidden";
    });

}

const updateTask = () => {
    let counter = 0;
    append_list.innerHTML = "";
    if (myArr.length == 0) {
        localStorage.setItem("tasks", JSON.stringify(myArr));
        work_list.style.visibility = 'hidden';
        return;
    }
    work_list.style.visibility = 'visible';


    myArr.forEach((item) => {
        counter++;

        let myLi = document.createElement("li");
        myLi.classList.add("task-aliment");



        let paragraph = document.createElement("p");
        paragraph.classList.add("text-name");
        paragraph.textContent = `${counter}. ${item.title}`;
        paragraph.addEventListener("click", function() {
            title.textContent = item.title;
            details.style.visibility = 'visible';
        });

        let div = document.createElement("div");


        let editText = document.createElement("img");
        editText.classList.add("del-update");
        editText.src = "./src/assets/update.svg"
        editText.addEventListener("click", function() {
            update(item);
        });

        let delText = document.createElement("img");
        delText.classList.add("del-update");
        delText.src = "./src/assets/del.svg"
        delText.addEventListener("click", function() {
            console.log(item);
            delItem(item);

        });



        myLi.appendChild(paragraph);
        div.appendChild(editText);
        div.appendChild(delText);
        myLi.appendChild(div);
        append_list.appendChild(myLi);

    });
    count.textContent = `Total Count  ${counter}`
    search_bar.value = "";
    description.value = "";

    localStorage.setItem("tasks", JSON.stringify(myArr));
}

updateTask();

save_button.addEventListener("click", () => {
    id_counter++;
    if (search_bar.value === "") {
        return;
    }
    const obj = {
        id: id_counter
    }
    obj.title = search_bar.value;
    obj.description = description.value;
    // myObject.age = 30;

    myArr.unshift(obj);
    updateTask();
    localStorage.setItem("counter", id_counter);
});

clear_button.addEventListener("click", (event) => {
    search_bar.value = "";
    description.value = "";
});

cancel_update.addEventListener("click", (event) => {
    update_text.value = "";
    update_description.value = ""
    edit.style.visibility = 'hidden';
});
cancel.addEventListener("click", (event) => {
    details.style.visibility = 'hidden';
});
cancel_button.addEventListener("click", (event) => {
    del_popup.style.visibility = "hidden"
});