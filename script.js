var eventBriteAPI = "OVMXD2IZ6NPP3KHS7G4E";
var yelpAPI = "9VUtXRmjC3Psh50MTKDn-lpXsZIazhjlyx88TpX6WWLCHvk-_-DuGww3FkdhLhSDpIPlFvOzMjVSsJaS1hrIbG3FYNxznVAWr_UMGM4E8DbkOzrAz5pYOQY1qUW5X3Yx"
// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
calendars.forEach(calendar => {
// Add listener to date:selected event
calendar.on('date:selected', date => {
console.log(date);
});
});