import edit_image from "/src/assets/update.png";
import del_image from "/src/assets/delete.png"
const search_bar = document.querySelector(".search-bar");
const save_button = document.querySelector(".save-button");
const append_list = document.querySelector(".append_list");
const work_list = document.querySelector(".append_list");
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
const des = document.querySelector(".des");
const cancel = document.querySelector(".cancel");
const all_delete = document.querySelector(".delete-all");
const no_data = document.querySelector(".no-data");
const del_button_all = document.querySelector(".del-button-all");
const del_all_pop = document.querySelector(".del-all-pop");
const cancel_button_all = document.querySelector(".cancel-button-all");
save_button.disabled = false;
save_button.classList.add("dis");
update_button.disabled = false;
update_button.classList.add("dis");

const baseUrl = "https://backend-json-production.up.railway.app/toDoData"


let my_item;

let myArr = [];

// myArr = JSON.parse(localStorage.getItem("tasks"));

let id_counter = 0;
// id_counter = localStorage.getItem("counter")


const dbWrapperPatch = (resourceId, updateData) => {
    return new Promise((resolve) => {
        resolve(fetch(`${baseUrl}/${resourceId}`, {
            method: 'PATCH',

            body: JSON.stringify(updateData)
        }))
    });
}


const dbWrapperPost = (title, description) => {
    return new Promise((resolve, reject) => {
        resolve(fetch(`${baseUrl}`, {
            method: "POST",
            body: JSON.stringify({
                title: `${title}`,
                description: `${description}`
            }),
        }))
    })
}

const dbWrapperDelete = (resourceId) => {
    return new Promise((resolve, reject) => {
        resolve(fetch(`${baseUrl}/${resourceId}`, {
            method: 'DELETE',
        }))
    });
}


const dbWrapperGet = () => {
    return new Promise((resolve, reject) => {

        resolve(fetch(`${baseUrl}`, {
                method: "GET"
            }))
            // reject(error);
    })
}

// crud rest full api and rest api

dbWrapperGet().then((response) => {
        return response.json();
    }).then((data) => {
        myArr = data;
        updateTask();
    })
    .catch((error) => {
        console.log(error);
    })

const update = (item) => {
    edit.style.visibility = 'visible';
    update_text.value = item.title;

    update_description.value = item.description;
    if (update_description.value === "") {
        update_description.placeholder = "No Description Availible"
    }

    my_item = item;

}
const delItem = (item) => {
    del_popup.style.visibility = "visible";

    my_item = item;
}
let counter = 0;

const updateTask = () => {
    let mycount = 0;
    no_data.style.visibility = 'hidden';
    append_list.innerHTML = "";
    if (myArr.length == 0) {
        // localStorage.setItem("tasks", JSON.stringify(myArr));
        count.textContent = `Your To-Do List (${counter} items)`
        work_list.style.visibility = 'hidden';
        no_data.style.visibility = 'visible';
        return;
    }
    work_list.style.visibility = 'visible';


    myArr.forEach((item) => {
        mycount++;
        let myLi = document.createElement("li");
        myLi.classList.add("task-aliment");



        let paragraph = document.createElement("p");
        paragraph.classList.add("text-name");
        paragraph.textContent = `${mycount}. ${item.title}`;
        paragraph.addEventListener("click", function() {
            title.textContent = "Title : " + item.title;
            if (item.description == "") {
                des.textContent = "Description : Not Availible";
            } else {
                des.textContent = "Description : " + item.description;
            }
            details.style.visibility = 'visible';
        });

        let div_update = document.createElement("div");
        div_update.classList.add("update");
        div_update.addEventListener("click", function() {
            update(item);
        });
        let div_del = document.createElement("div");
        div_del.classList.add("del");
        div_del.addEventListener("click", function() {
            delItem(item);

        });


        let editText = document.createElement("img");
        editText.classList.add("img-size");
        editText.src = edit_image;

        let delText = document.createElement("img");
        delText.classList.add("img-size");
        delText.src = del_image;




        myLi.appendChild(paragraph);
        div_update.appendChild(editText);
        div_del.appendChild(delText);
        myLi.appendChild(div_update);
        myLi.appendChild(div_del);
        append_list.appendChild(myLi);

    });
    count.textContent = `Your To-Do List (${counter} items)`
    search_bar.value = "";
    description.value = "";

    // localStorage.setItem("tasks", JSON.stringify(myArr));
}
let check = 0;
search_bar.addEventListener("keydown", (event) => {
    check = event.target.value.length
    if (event.keyCode === 8) {
        //       event.target.value.length;
        check--;

    } else {
        check++
    }
    if (check >= 3) {
        save_button.disabled = true;
        save_button.classList.remove("dis");
    } else {
        save_button.disabled = false;
        save_button.classList.add("dis");
    }
})



save_button.addEventListener("click", () => {
    let mytitle = search_bar.value;
    let myDes = description.value;

    id_counter++;
    if (search_bar.value === "") {
        return;
    }
    // if (search_bar.value.length < 3) {
    //     alert("enter at least 3 alphabet in task title");
    //     return;
    // }
    counter++;
    dbWrapperPost(mytitle, myDes).then(() => {
            dbWrapperGet().then((response) => {
                    return response.json();
                }).then((data) => {
                    myArr = data;
                    updateTask();
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
    save_button.disabled = false;
    save_button.classList.add("dis");

    // localStorage.setItem("counter", id_counter);
});

clear_button.addEventListener("click", (event) => {
    search_bar.value = "";
    description.value = "";
    save_button.disabled = false;
    save_button.classList.add("dis");
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

del_button.addEventListener("click", (event) => {
    counter--;
    dbWrapperDelete(my_item.id).then(() => {
        dbWrapperGet().then((response) => {
                return response.json();
            }).then((data) => {
                myArr = data;
                updateTask();
                del_popup.style.visibility = "hidden";
                my_item = null;
            })
            .catch((error) => {
                console.log(error);
            })

    })


});
update_text.addEventListener("keyup", (event) => {

    if (my_item.title === update_text.value && my_item.description === update_description.value) {
        update_button.disabled = false;
        update_button.classList.add("dis");
    } else {
        update_button.disabled = true;
        update_button.classList.remove("dis");
    }
})

update_description.addEventListener("keyup", (event) => {

    if (my_item.description === update_description.value && my_item.title === update_text.value) {
        update_button.disabled = false;
        update_button.classList.add("dis");
    } else {
        update_button.disabled = true;
        update_button.classList.remove("dis");
    }
})
update_button.addEventListener("click", (event) => {


    if (update_text.value === "") {
        update_text.value = "";
        update_description.value = "";
        edit.style.visibility = 'hidden';
        return;
    }
    if (my_item.title === update_text.value) {}
    let new_val = update_text.value;
    let new_des = update_description.value;

    const updateData = {
        title: `${new_val}`,
        description: `${ new_des}`
    }
    dbWrapperPatch(my_item.id, updateData).then(() => {
        dbWrapperGet().then((response) => {
                return response.json();
            }).then((data) => {
                myArr = data;
                updateTask();
            })
            .catch((error) => {
                console.log(error);
            })
    })


    update_text.value = "";
    update_description.value = ""
    edit.style.visibility = 'hidden';
    my_item = null;
});

all_delete.addEventListener("click", (event) => {
    if (myArr.length === 0) {
        return;
    }
    del_all_pop.style.visibility = 'visible'


});

del_button_all.addEventListener("click", (event) => {

    myArr.forEach((item) => {
        dbWrapperDelete(item.id).then(() => {
            dbWrapperGet().then((response) => {
                    return response.json();
                }).then((data) => {
                    myArr = data;
                    counter = 0;
                    updateTask();
                    del_all_pop.style.visibility = 'hidden'
                })
                .catch((error) => {
                    console.log(error);
                })

        })
    });

});

cancel_button_all.addEventListener("click", (event) => {
    del_all_pop.style.visibility = 'hidden'
})