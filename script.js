$(document).ready(function() {
  $("ul.nav li").on("click", function(event){
    $("ul.nav li").removeClass("active");
    $(this).addClass("active");
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

  initialize_maps('#adressen')
});

function initialize_maps(target) {
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map($(target).find('.gmaps').get(0), mapOptions);
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
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(function() { marker.setAnimation(null); }, 3000);
    })
  });

  map.fitBounds(bounds);
}
