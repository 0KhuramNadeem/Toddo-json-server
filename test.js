// localStorage.setItem("name", "Khuram Nadeem");
// localStorage.setItem("age", 12);
// age = localStorage.getItem("age");
// console.log(age);

let arr = [1, 2, 3, 4, 5];
localStorage.setItem("task", JSON.stringify(arr));

let newarr = JSON.parse(localStorage.getItem("names"));

console.log(newarr)