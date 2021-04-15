

//run the LoadTable function when the page has loaded
$(document).ready(function () {
    LoadTable();
});

const uri = "/api/Voters"; //add uri api voters
//alert("API " + uri);
let allApplicant = null; //holds the data in a global
//Loads up the <p id="counter"> </p> with a count of the Applicant, data come from the LoadTable Function where this is called
function getCount(data) {
    // alert("getcount " + datas);
    const theCount = $("#counter"); //bind TheCount to the counter
    if (data) { //if any data exists
        // alert("We have data " + data);
        theCount.text("There are " + data + " allApplicant");
    } else {
        theCount.text("There are no Applicant");
        alert("No data");
    }
}
// after any changes this function reloads the table of Applicant
function LoadTable() {
    $.ajax({
        type:"GET", //use the GET controller
        url: uri, //use uri
        cache: false, //don't cache the data in browser reloads, get a fresh copy
        success: function (data) {
           // console.log(data);//if the request succeeds ....
            const tBody = $("#allApplicant"); //tbody with allApplicant <tbody id="allApplicant"></tbody>
            allApplicant = data; //pass in all the data to the global allApplicant use it in Edit
            $(tBody).empty(); //empty out old data
            getCount(data.length);     //count for the counter function
            //a foreach through the rows creating table data
            $.each(data,
                function (key, item) {
                    //alert(item.firstName);
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.firstName)) //add item firstname
                        .append($("<td></td>").text(item.lastName))//add item lastname
                        .append($("<td></td>").text(item.age))//add item age
                        .append($("<td></td>").text(item.address))//add item address
                        .append($("<td></td>").text(item.phone))//add item phone


                        .append($('<button href="#editApplicantModal" data-toggle="modal" class="btn-info"><i class="material-icons"  data-toggle="tooltip" title="Edit"> &#xE254;</i></button>')
                        .on("click", function () {
                                editApplicant(item.id);//here give edit id
                            //add edititem button
                            }) 

                        )
                        .append(
                            $("<td></td>")
                                .append(
                                    $('<button  href="#deleteApplicantModal" data-toggle="modal" class="btn-info" ><i class="material-icons" data-toggle="tooltip" title="Delete"> &#xE872;</i></button>')
                                        .on("click", function () {
                                            $("#delete-id").val(item.id);
                                        }
                                            //add deleteitem button
                                        )
                                )
                        );
                    tr.appendTo(tBody);//adding all the rows to the tbody
                });
           
        }
    });

}
//Add an person to the database
function addItem() {
    const item = {
        firstName:$("#add-firstname").val(),
        lastName:$("#add-lastname").val(),
        age:$("#add-age").val(),
        address:$("#add-address").val(),
        phone:$("#add-phone").val()
    };
    //alert($("#add-Age").val() + $("#add-Address").val() + $("#add-Phone").val());
    $.ajax({
        type: "POST", //this calls the POST in the API controller
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        //if there is an error
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        //if it is successful
        success: function (result) {
            LoadTable();
            $("#add-firstname").val(""); //clear entry boxes
            $("#add-lastname").val("");
            $("#add-age").val("");
            $("#add-address").val("");
            $("#add-phone").val("");
           alert("Applicant Added Sucessfully");
            //alert($("#add-Firstname").val("")+$("#add-Lastname").val("") +$("#add-Age").val("") + $("#add-Address").val("") + $("#add-Phone").val(""));
        }
    });
}
//Delete a person from the database
function deleteApplicant(id) {

    $.ajax({
        url: uri + "/" + id, //add the ID to the end of the URI
        type: "DELETE", //this calls the DELETE in the API controller
        success: function (result) {
            LoadTable();
        }
    });
}
//click event for edit button to load details into form. Go through each entry held in allApplicant and add in the one that matches the id from the click
function editApplicant(id) {
    $.each(allApplicant,
        function (key, item) {
            if (item.id === id) {//where the ID == the one on the click
                $("#edit-firstname").val(item.firstName); //add it to the form field
                $("#edit-id").val(item.id);
                $("#edit-lastname").val(item.lastName);
                $("#edit-age").val(item.age);
                $("#edit-address").val(item.address);
                $("#edit-phone").val(item.phone);;
            }
        });
}
//saving the edit to the db
function saveItem() {
    const item = { //pass all the data on the form to a variable called item use later to send to server
        firstName: $("#edit-firstname").val(),
        lastName: $("#edit-lastname").val(),
        age: $("#edit-age").val(),
        address: $("#edit-address").val(),
        phone: $("#edit-phone").val(),
        id: $("#edit-id").val()
    };
    alert("Saving ... Applicant-Id " + item.id + " Applicant-firstname " + item.firstname + " Applicant-lastname " + item.lastname + " Applicant-Age " + item.Age + " Applicant-Address " + item.Address + " Applicant-Phone " + item.Phone);
    $.ajax({
        url: uri +"/"+$("#edit-id").val(), //add the row id to the uri
        type: "PUT", //send it to the PUT controller
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item), //take the item data and pass it to the serever data is moved to server
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {

            LoadTable(); //load the table afresh
        }
    });
    return false;
};
