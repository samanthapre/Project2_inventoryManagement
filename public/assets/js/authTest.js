$(document).ready(function () {
    if (sessionStorage.getItem("Name") === null) {
        window.location.replace("/");
        console.log("checked")
    }
});
