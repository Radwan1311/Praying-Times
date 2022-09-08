
// this is the function which we can use to get the user location
$("#find_btn").click(function () { //user clicks button
	if ("geolocation" in navigator){ //check geolocation available
		    //try to get user current location using getCurrentPosition() method
		    navigator.geolocation.getCurrentPosition(function(position){
        let long = position.coords.longitude ;
        let lati = position.coords.latitude ;

        // converting the user location cord (latitude , longitude) to the city name and the country
        $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lati + "," +long+"&key=AIzaSyBgO1PpmaQgelvqbrCkIiDg5eAmyVV6sPA&sensor=false", function(data) {
        let city = data.results[1].address_components[3].long_name;
        let country = data.results[1].address_components[4].long_name;



          // lets apply the user location to get the correct praying times
        $.get('https://api.aladhan.com/v1/hijriCalendarByCity?city='+city+'&country='+country , function(data2){


          // now we set the praying times accordings to the user location
          let fajr =   $('#fajr').html('Fajr time is : ' +data2.data[0].timings.Fajr );
          let zohr =   $('#zohr').html('zohr time is : ' + data2.data[0].timings.Dhuhr);
          let asr =  $('#asr').html('asr time is : ' + data2.data[0].timings.Asr);
          let magrib =   $('#magrib').html('magrib time is : ' + data2.data[0].timings.Maghrib);
          let ishaa =   $('#ishaa').html('ishaa time is : ' + data2.data[0].timings.Isha);

        });
      });
			});






	}else{
    alert('Please refresh the page and then press allow.')
	}
});
