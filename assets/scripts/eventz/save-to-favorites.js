console.log('save to favs.js');

var FavoritesSection = function() {

	/**
	 * whenUserSavesEvent Gets the data from the event and pushes it to firebase
	 */
	function whenUserSavesEvent() {
		// var eventName = $(.event-item).attr('data-event-id');
		// var eventDate = data-date
		// var eventImage = .event-item img src

	  database.ref("saved/").push({
	      event: event,
	      date: city,
	      img: state
	  });
	}

	function init() {
		console.log('init');
	}

	return {
		init: init
	}
}();

FavoritesSection.init();