/**
 * SearchFormValidation validates the search form has correct values as well as an autocomplete for the states.
 * This validation checks the zipcode and state values are 'valid' and lets the user know before they submit the form.
 */
var SearchFormValidation = function() {

	/**
	 * zipCodeValidation checks to see if the zip code is equal to 5 digits. also doesnt allow letters or special characters.
	 */
	function zipCodeValidation() {
		//on focusout, check the zip length
		$('#search-zipcode').focusout(function() {
		  var zipValue = $('#search-zipcode').val().trim();
			$('#search-zipcode').siblings('.validation').remove();

		  if(zipValue.length !== 0 && zipValue.length !== 5) {
		  	$('<span class="validation error">Invalid zip code <span class="far fa-times-circle"></span></span>').insertAfter($('#search-zipcode'));
		  } else if (zipValue.length === 5) {
		  	$('<span class="validation success"><span class="far fa-check-circle"></span></span>').insertAfter($('#search-zipcode'));
		  }
		});

		// on focus, remove the validation span
		$('#search-zipcode').focus(function() {
			$('#search-zipcode').siblings('.validation').remove();
			$('.submit-error').remove();
		});

		//on keydown, only allow certain characters
		$("#search-zipcode").keydown(function (e) {
		    // Allow: backspace, delete, tab, escape and enter
		    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
		         // Allow: Ctrl+A, Command+A
		        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
		         // Allow: home, end, left, right, down, up
		        (e.keyCode >= 35 && e.keyCode <= 40)) {
		             // let it happen, don't do anything
		             return;
		    }
		    // Ensure that it is a number and stop the keypress
		    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		        e.preventDefault();
		    }
		});
	}

	/**
	 * stateValidation has autocomplete functionality to allow users to begin typing a state and allowing them to select said state.
	 * The form also checks to ensure the state is indeed entered in the form input correctly.
	 */
	function stateValidation() {
    var availableStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming', 'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY'];

    //add autocomplete to the state search input
    $( "#search-state" ).autocomplete({
      source: availableStates
    });

		function toLower(x){ 
		  return x.toLowerCase();
		};
		availableStates = availableStates.map(toLower);

		$('#search-state').focusout(function() {
		  var stateValue = $('#search-state').val().trim().toLowerCase();
			$('#search-state').siblings('.validation').remove();

			//if the stateValue is in availableStates array (these are both lowercase at this point to check)
			if(availableStates.includes(stateValue)) {
				$('<span class="validation success"><span class="far fa-check-circle"></span></span>').insertAfter($('#search-state'));
			} else if (stateValue === '') {
				// do nothing
			} else {
				$('<span class="validation error">Invalid state <span class="far fa-times-circle"></span></span>').insertAfter($('#search-state'));
			}
		});

		// on focus, remove the validation span
		$('#search-state').focus(function() {
			$('#search-state').siblings('.validation').remove();
			$('.submit-error').remove();
		});
	}

	function init() {
		zipCodeValidation();
		stateValidation();
	}

	return {
		init: init
	}

}();

SearchFormValidation.init();