// script blogs view
const delBtns = document.querySelectorAll(".del-btn");
const url = new URL(location.href).origin;

delBtns.forEach(e => {
    e.addEventListener("click", () => {
        const id = e.dataset.target;
        fetch(url+"/delete/" + id, {
            method: "DELETE"
        })
            .then((res) => {
                location.assign("/");
            })
            .catch(err => console.log(err));
    })
});
// -------------------


// script newblog view dan edit view
if (document.getElementById("teks")) {
    CKEDITOR.replace('teks');
}
// -------------------------


