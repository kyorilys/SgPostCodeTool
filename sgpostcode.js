//getAddBylatlng require 3 parameter (latitude,ongitude and postcode)
var getAddBylatlng = function(lat, lng, postcode) {

    //check whether postcode exist
    var checkPostCodeExist = (postcode === undefined || postcode == 0);

    $.ajax({
        cache: false,
        type: "GET",
        url: "http://maps.googleapis.com/maps/api/geocode/json",
        data: {
            "latlng": lat + "," + lng,
            "sensor": true
        },
        cache: false,
        success: function(data) {
            var key = 0; //key to store postcode

            //First result of the formatted_address return from Google
            var resultformatted = result = data.results[0].formatted_address;

            //for loop to search add the return result
            for (var k = 0; k < data.results.length; k++) {
                //tempresult is temporary variable to hold formated result
                var tempresult = result = data.results[k].formatted_address;

                //if the tempresult contain the postcode then use the result  
                if (tempresult.includes(postcode)) {
                    result.formatted == tempresult;
                    break;
                } else {
                    //if the result don't have the result then use the longest
                    // =D like old school question choose the longest 
                    if (tempresult.length > resultformatted.length) {

                        resultformatted = tempresult;
                    }
                }
            }

            //remove the Singapore Word
            var result = resultformatted.split(", Singapore");

            //$("#@Html.FieldIdFor(model => model.StreetAddress)").val(result[0]);
            return result[0]; //Address


        }
    });
}


//enter the getaddressbypostcode at html and add this at the element (Better is input tag)
var getAddressByPostCode = function(element) {

    var value = element.value; //element here is the input , so if you do not passinput then might need to modified the code.
    //var value = $("#@Html.FieldIdFor(model => model.ZipPostalCode)").val();

    //Since normally singapore post code is 6 digit so if will show the result only after you type 6 digit
    if (value.length > 5) {
        $.ajax({
            cache: false,
            type: "GET",
            url: "http://maps.googleapis.com/maps/api/geocode/json",
            data: {
                "address": value,
                "sensor": true,
                "components": "country:sg"
            },
            cache: false,
            success: function(data) {
                var result = data.results[0].geometry.location;
                getAddBylatlng(result.lat, result.lng, value);
            }
        });
    }


}
