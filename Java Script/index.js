// 1- Select Elements From HTML Document

var sitName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var edit = document.getElementById("edit");
var search = document.getElementById("search");
var table = document.getElementById("table");
var layer = document.querySelector(".layer")
var closeButton = document.getElementById("close");
var warningIcon = document.querySelectorAll(".warning");
var checked = document.querySelectorAll(".checked");
var updatedIndex; // Global Index Variable For Updating A Specific BookMark
var regex = /^(https?:\/\/|ftp:\/\/|file:\/\/|mailto:|data:)[\w\-]+(\.[\w\-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;// URL Regular Expression.
var booklist = []; // Global List For Storing BookMarks And Storing It In Browser Local History 

// 2- Events

submit.addEventListener("click",function(e){
    e.preventDefault();
    if(add()!=false){
        add();
        checked[0].classList.add("d-none");
        sitName.style.outlineColor = "black";
        warningIcon[0].classList.add("d-none");
        checked[1].classList.add("d-none");
        siteUrl.style.outlineColor = "black";
        warningIcon[1].classList.add("d-none");
    }
    else{
        layer.classList.replace("d-none","d-flex");
        checked[0].classList.add("d-none");
    }
})
edit.addEventListener("click",function(e){
    e.preventDefault();
    if(Edit(updatedIndex)!=false){
        Edit(updatedIndex);
        checked[0].classList.add("d-none");
        sitName.style.outlineColor = "black";
        warningIcon[0].classList.add("d-none");
        checked[1].classList.add("d-none");
        siteUrl.style.outlineColor = "black";
        warningIcon[1].classList.add("d-none");
    }
    else{
        layer.classList.replace("d-none","d-flex");
        checked[0].classList.add("d-none");
    }
})
search.addEventListener("keyup",function(e){
    var temp = "";
    for(var i =0;i<booklist.length;i++){
        if(booklist[i].sitname.toLowerCase().startsWith(search.value.toLowerCase())){
            temp += `<tr>
            <td class="align-middle">`+(i+1)+`</td>
            <td class="align-middle">`+booklist[i].sitname+`</td>
            <td class="align-middle"><a target="_blank" href="`+booklist[i].siteurl+`"><button class="btn btn-outline-success col-12 col-md-9 col-lg-7"><i class="fa-solid fa-location-arrow pe-1"></i> Visit</button></a></td>
            <td class="align-middle"><button onclick="update(`+i+`)" class="btn btn-outline-warning col-12 col-md-9 col-lg-7"><i class="fa-solid fa-wrench pe-1"></i> Update</button></td>
            <td class="align-middle"><button onclick="Delete(`+i+`)" class="btn btn-outline-danger col-12 col-md-9 col-lg-7"><i class="fa-solid fa-trash-can pe-1"></i> Delete</button></td>
            </tr>`
        }
    }
    table.innerHTML = temp;
})
closeButton.addEventListener("click",function(e){
    layer.classList.replace("d-flex","d-none");
})
layer.addEventListener("click",function(e){
    if(e.target==layer){
        layer.classList.replace("d-flex","d-none");
    }
})
sitName.addEventListener("keyup",function(e){
    if(sitName.value.length<3 && sitName.value.length>=0){
        warningIcon[0].classList.remove("d-none");
        checked[0].classList.add("d-none");
        sitName.style.outlineColor = "red";
    }
    else{
        warningIcon[0].classList.add("d-none");
        checked[0].classList.remove("d-none");
        sitName.style.outlineColor = "green";
    }
})
siteUrl.addEventListener("keyup",function(e){
    if(regex.test(siteUrl.value)){
        warningIcon[1].classList.add("d-none");
        checked[1].classList.remove("d-none");
        siteUrl.style.outlineColor = "green";
    }
    else{
        warningIcon[1].classList.remove("d-none");
        checked[1].classList.add("d-none");
        siteUrl.style.outlineColor = "red";
    }
})

// 3- Actions(Functions)

if(localStorage.getItem("key")!=null){
    booklist = JSON.parse(localStorage.getItem("key"))
    display(booklist)
}
function add(){
    var obj = {
        sitname : sitName.value,
        siteurl : siteUrl.value
    };
    if(obj.sitname.length<3 && obj.sitname.length>0){
        return false;
    }else if(obj.sitname!=""&&obj.siteurl!=""&&regex.test(obj.siteurl)){
        booklist.push(obj);
        localStorage.setItem("key",JSON.stringify(booklist));
        clear();
        display(booklist);
    }else{
        return false;
    }
}
function Edit(index){

    if(sitName.value.length<3 && sitName.value.length>0){
        return false;
    }else if(sitName.value!=""&&regex.test(siteUrl.value)){
    booklist[index].sitname = sitName.value;
    booklist[index].siteurl = siteUrl.value;
    localStorage.setItem("key",JSON.stringify(booklist));
    clear();
    display(booklist);
    submit.classList.replace("d-none","d-block");
    edit.classList.replace("d-block","d-none");
    }else{
        return false;
    }
}
function clear(){
    sitName.value = "";
    siteUrl.value = "";
}
function Delete(index){
    booklist.splice(index,1);
    localStorage.setItem("key",JSON.stringify(booklist));
    display(booklist)
}
function update(index){
    sitName.value = booklist[index].sitname;
    siteUrl.value = booklist[index].siteurl;
    updatedIndex = index;
    submit.classList.replace("d-block","d-none");
    edit.classList.replace("d-none","d-block");
}
function display(booklist){
    var temp = "";
    for(var i =0;i<booklist.length;i++){
        temp += `<tr>
                <td class="align-middle">`+(i+1)+`</td>
                <td class="align-middle">`+booklist[i].sitname+`</td>
                <td class="align-middle"><a target="_blank" href="`+booklist[i].siteurl+`"><button class="btn btn-outline-success col-12 col-md-9 col-lg-7"><i class="fa-solid fa-location-arrow pe-1"></i> Visit</button></a></td>
                <td class="align-middle"><button onclick="update(`+i+`)" class="btn btn-outline-warning col-12 col-md-9 col-lg-7"><i class="fa-solid fa-wrench pe-1"></i> Update</button></td>
                <td class="align-middle"><button onclick="Delete(`+i+`)" class="btn btn-outline-danger col-12 col-md-9 col-lg-7"><i class="fa-solid fa-trash-can pe-1"></i> Delete</button></td>
                </tr>`
    }
    table.innerHTML = temp;
}