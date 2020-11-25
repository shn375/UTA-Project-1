var eventBriteAPI = "OVMXD2IZ6NPP3KHS7G4E";
var yelpAPI = "9VUtXRmjC3Psh50MTKDn-lpXsZIazhjlyx88TpX6WWLCHvk-_-DuGww3FkdhLhSDpIPlFvOzMjVSsJaS1hrIbG3FYNxznVAWr_UMGM4E8DbkOzrAz5pYOQY1qUW5X3Yx"
// Initialize all input of type date
var calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
for(var i = 0; i < calendars.length; i++) {
	// Add listener to select event
	calendars[i].on('select', date => {
		console.log(date);
	});
}

// To access to bulmaCalendar instance of an element
var element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function(datepicker) {
		console.log(datepicker.data.value());
	});
}