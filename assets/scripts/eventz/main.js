let states = ["Alaska","Alabama","Arkansas","Arizona","California","Colorado","Connecticut",
  "District of Columbia","Delaware","Florida","Georgia","Hawaii","Iowa","Idaho","Illinois",
  "Indiana","Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine","Michigan",
  "Minnesota","Missouri","Mississippi","Montana","North Carolina"," North Dakota","Nebraska",
  "New Hampshire","New Jersey","New Mexico","Nevada","New York","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee",
  "Texas","Utah","Virginia","Vermont","Washington","Wisconsin","West Virginia","Wyoming"];
  
  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
  
  //Focus Modal
  var modalFocus = function() {
    //Focus name text-field on Sign-up Click
    $('#signupModal').on('shown.bs.modal', function () {
      $('#user-name').focus();
    })
  };
  modalFocus();

  var populateStates = function() {
    var html = "";
    states.forEach( function(state) {
      html += `<option>${state}</option>`
    })
    $('.state-list').append(html);
  }
  populateStates();
