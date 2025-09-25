const list = document.querySelectorAll("#list li")
console.log(list);

list.forEach((e,i) => {
    e.innerHTML = `list ${i}`
})
