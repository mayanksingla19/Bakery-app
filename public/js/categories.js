function displayEdit(catid,catname){
    document.getElementById("form_add").className = "hide";
    document.getElementById("form_edit").className = "show";
    document.getElementById("form_delete").className = "hide";
    document.getElementById("categoryid1").value = catid;
    document.getElementById("categoryname1").value = catname;
}
function displayDelete(catid,catname){
    document.getElementById("form_add").className = "hide";
    document.getElementById("form_edit").className = "hide";
    document.getElementById("form_delete").className = "show";
    document.getElementById("categoryid2").value = catid;
    document.getElementById("categoryname2").value = catname;
}