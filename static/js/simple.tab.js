$(document).ready(function() {
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
});

/* fixed menu */
$(document).ready(function(){
	$("#menu-fixed").pin({
			alert("hola");
	      containerSelector: ".container.min"
	})

});
