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

var pinColor = "a00100";
var pinImage = null;
var pinShadow = null;

function initialize_maps() {
  pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34));
  pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
      new google.maps.Size(40, 37),
      new google.maps.Point(0, 0),
      new google.maps.Point(12, 35));

  initialize_address_maps();
  initialize_hotels_maps();
}

function initialize_address_maps() {
  var target = '#adressen';
  var mapEl = $(target).find('.gmaps');
  var map = new google.maps.Map(mapEl.get(0), map_options());
  var bounds = new google.maps.LatLngBounds();

  $(target).find('span[data-location]').each(function(index, el) {
    var element = $(el);
    var name = element.text();
    var myLatlng = latlng_from_el(element);
    bounds.extend(myLatlng);

    var marker = create_marker(myLatlng, name)
    marker.setMap(map);
    init_click_handler(mapEl, marker, element, name);
  });

  map.fitBounds(bounds);
}

function initialize_hotels_maps() {
  var target = '#hotels';
  var addressen_target = '#adressen';


  var mapEl = $(target).find('.gmaps');
  var map = new google.maps.Map(mapEl.get(0), map_options());
  var bounds = new google.maps.LatLngBounds();

  $(target).find('span[data-location]').each(function(index, el) {
    var element = $(el);
    var name = element.text();
    var myLatlng = latlng_from_el(element);
    bounds.extend(myLatlng);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: name,
    });
    marker.setMap(map);

    init_click_handler(mapEl, marker, element, name);
  });

  $(addressen_target).find('span[data-location]').each(function(index, el) {
    var element = $(el);
    var name = element.text();
    var myLatlng = latlng_from_el(element);
    bounds.extend(myLatlng);

    var marker = create_marker(myLatlng, name)
    marker.setMap(map);
  });

  map.fitBounds(bounds);
}

function map_options() {
  return {
    center: new google.maps.LatLng(50.723080,7.095900),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
}

function latlng_from_el(el) {
  var location = el.data('location').split(',');
  return new google.maps.LatLng(parseFloat(location[1]), parseFloat(location[0]));
}

function create_marker(latlng, name) {
  return new google.maps.Marker({
    position: latlng,
    title: name,
    icon: pinImage,
    shadow: pinShadow
  });
}

function init_click_handler(mapEl, marker, element, name) {
    element.html('<a>' + name + '</a>');
    element.click(function(ev) {
      mapEl.focus();
      $('html, body').animate({
        scrollTop: (mapEl.offset().top - 100)
      }, 500);
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(function() { marker.setAnimation(null); }, 3000);
    })
}
