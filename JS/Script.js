$( document ).ready(function() {

    //variable declaration and initization
    var formData;
    var provDropDownList = $('#ddlProvince');
    var cityDropDownList = $('#ddlCity');
    var displayProv;
    var displayCity;
    var cityDesc;
    var datamodel = {
    "Provinces": [
        { 
            "kProvinceID": 0, 
            "AbbrevName": "NS",
            "Name": "Nova Scotai"
        },
        {
            "kProvinceID": 1, 
            "AbbrevName": "AB",
            "Name": "Alberta"
        },
        {
            "kProvinceID": 2, 
            "AbbrevName": "BC",
            "Name": "British Columbia"
        }
    ],

    "Cities": [
        {
            "kCityID": 0, 
            "fkProvinceID": 0,
            "Name": "Halifax",
            "Description": "Halifax is a major economic centre in eastern Canada with a large concentration of government services and private sector companies."
        },
        {
            "kCityID": 1, 
            "fkProvinceID": 0,
            "Name": "Syndey",
            "Description": "Sydney is a Canadian community in Nova Scotia. Situated on Cape Breton Island's east coast, it belongs administratively to the Cape Breton Regional Municipality. Sydney was founded in 1785 by the British Crown."
        },
        {
            "kCityID": 2, 
            "fkProvinceID": 1,
            "Name": "Calgary",
            "Description": "As of the 2011 census, the City of Calgary had a population of 1,096,833[3] and a metropolitan population of 1,214,839, making it the largest city in Alberta."
        },
        {
            "kCityID": 3, 
            "fkProvinceID": 1,
            "Name": "Lethbridge",
            "Description": "Lethbridge is the commercial, financial, transportation and industrial centre of southern Alberta. The city's economy developed from drift mining for coal in the late 19th century and agriculture in the early 20th century."
        },
        {
            "kCityID": 4, 
            "fkProvinceID": 2,
            "Name": "Vancouver",
            "Description": "Vancouver is a coastal seaport city on the mainland of British Columbia, Canada. The 2011 census recorded more than 603,000 people in the city, making it the eighth largest Canadian city."
        },
        {
            "kCityID": 5, 
            "fkProvinceID": 2,
            "Name": "Victoria",
            "Description": "Victoria is about 100 kilometres (62 miles) from BC's largest city of Vancouver on the mainland. The city is about 100 kilometres (62 miles) from Seattle by airplane, ferry, or the Victoria Clipper passenger-only ferry."
        },

    ]	
    
};

//Form display
$('#SubmitForm').show();
$('#EditForm').hide();
$('#maps').hide();

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

//populate Province DDL
$.each(datamodel.Provinces, function () {
    provDropDownList.append($("<option></option>").val(this['kProvinceID']).html(this['Name']));
});

//Populate City DDL based on prov selection
$('#ddlProvince').change(function() {
    $('#ddlCity option').remove();
    var cityTempDropDown = new Array();
    var selectedProv = parseInt($(this).children("option:selected").val());
    $.each(datamodel.Cities, function () {
        if(this.fkProvinceID === selectedProv){
            cityTempDropDown.push(this);
        }
    });
    $.each(cityTempDropDown, function () {
        cityDropDownList.append($("<option></option>").val(this['kCityID']).html(this['Name']));
    });
});

//On form submit
$('#SubmitForm').submit(function( event ) {
    formData = $(this).serialize();
    displayResults();
    console.log(formData);
    $('#SubmitForm').hide();
    $('#EditForm').show();
    $('#maps').show();
    event.preventDefault();
});

//On edit
$('#editButton').click(function( event ) {
    $('#SubmitForm').show();
    $('#EditForm').hide();
    $('#maps').hide();
    restoreForm();
    event.preventDefault();
});

//Displays result on form submission
function displayResults() {
    var obj = unserializeFormData(formData);

    // Restore items one by one
    if(obj.hasOwnProperty('txtName')) {
        $('#submittedName').text(obj.txtName);
    }

    if(obj.hasOwnProperty('txtOccupation')) {
        $('#submittedOccupation').text(obj.txtOccupation);
    }

    if(obj.hasOwnProperty('txtAddress1')) {
        $('#submittedAddr1').text(obj.txtAddress1);
    }

    if(obj.hasOwnProperty('txtAddress2')) {
        $('#submittedAddr2').text(obj.txtAddress2);
    }
   
    $.each(datamodel.Provinces, function () {
        if(this.kProvinceID === parseInt(obj.ddlProvince)){
            displayProv = this.Name;
        }
    });

    $.each(datamodel.Cities, function () {
        if(this.kCityID === parseInt(obj.ddlCity)){
            displayCity = this.Name;
            cityDesc = this.Description;
        }
    });

    if(obj.hasOwnProperty('ddlProvince')) {
        $('#submittedProv').text(displayProv);
    }

    if(obj.hasOwnProperty('ddlCity')) {
        $('#submittedCity').text(displayCity);
    }

    $('#cityDesc').text(cityDesc);

    var selectedCity = "https://maps.google.com/maps?q="+displayCity+"&ie=UTF8&iwloc=&output=embed"
    $('#gmap_canvas').attr("src",selectedCity);

} 

//Restores form data when edit button is clicked
function restoreForm() {
    var obj = unserializeFormData(formData);

    // Restore items one by one
    if(obj.hasOwnProperty('txtName')) {
        $('#txtName').val(obj.txtName);
    }

    if(obj.hasOwnProperty('txtOccupation')) {
        $('#txtOccupation').val(obj.txtOccupation);
    }

    if(obj.hasOwnProperty('txtAddress1')) {
        $('#txtAddress1').val(obj.txtAddress1);
    }

    if(obj.hasOwnProperty('txtAddress2')) {
        $('#txtAddress2').val(obj.txtAddress2);
    }

}  

//helper function to unserialize form data
function unserializeFormData(data) {
    var objs = [], temp;
    var temps = data.split('&');

    for(var i = 0; i < temps.length; i++){
        temp = temps[i].split('=');
        objs.push(temp[0]);
        objs[temp[0]] = temp[1]; 
    }
    return objs; 
}   

});