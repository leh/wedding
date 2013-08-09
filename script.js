$(document).ready(function() {
  $("ul.nav li").on("click", function(event){
    $("ul.nav li").removeClass("active");
    $(this).addClass("active");
    window.scrollBy(0,1); // http://stackoverflow.com/questions/11258877/fixed-element-disappears-in-chrome
  });

  // Remove the menu and min-height on smaller disp
  var windowWidth = $(window).width();
  if (windowWidth <= 995) {
    $(".navbar").remove();
    $("section").css("min-height", 0).css("padding-top", 0).css("padding-bottom", "60px");
  } else {
    var windowHeight = $(window).height();
    $("section").css("min-height", windowHeight + 100 + "px");
    $("body").attr("data-offset", windowHeight);
  }

  load_and_initialize_maps();
});

function load_and_initialize_maps() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyCi9Fw6e7izoLHrzPn_z6OgAMPGKqzCnYQ&sensor=false&callback=initialize_maps";
  document.body.appendChild(script);
}

function initialize_maps() {
  var target = '#adressen';
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapEl = $(target).find('.gmaps');
  var map = new google.maps.Map(mapEl.get(0), mapOptions);
  var bounds = new google.maps.LatLngBounds();

  $(target).find('span[data-location]').each(function(index, el) {
    var element = $(el);
    var name = element.text();
    var location = element.data('location').split(',');
    var myLatlng = new google.maps.LatLng(parseFloat(location[1]), parseFloat(location[0]));
    bounds.extend(myLatlng);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: name
    });
    marker.setMap(map);

    element.html('<a>' + name + '</a>');
    element.click(function(ev) {
      mapEl.focus();
      $('html, body').animate({
        scrollTop: (mapEl.offset().top - 100)
      }, 500);
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(function() { marker.setAnimation(null); }, 3000);
    })
  });

  map.fitBounds(bounds);
}
