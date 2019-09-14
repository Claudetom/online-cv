$(document).ready(function () {

    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function () {

        $('.level-bar-inner').each(function () {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });
		
		/* ajout dynamiquement au objets avec la class section, l'animation avec AniJS */ 
        //$('.section').attr("data-anijs", "if: click, on:window, do: bounceInLeft animated, before: scrollReveal, after: removeAnim");

    });

    /* ======= DEBUT - THEME CONFIG PANEL ====== */
    $('#config-trigger').click(function (e) {

        e.preventDefault();

        if ($(this).hasClass('config-panel-open')) {
            $("#config-panel").animate({
                right: "-=170" //same as the panel width
            }, 500);

            $(this).removeClass('config-panel-open').addClass('config-panel-hide');
        }
        else {
            $("#config-panel").animate({
                right: "+=170" //same as the panel width
            }, 500);

            $(this).removeClass('config-panel-hide').addClass('config-panel-open');
        }
    });

    $('#config-close').on('click', function (e) {
        e.preventDefault();
        $('#config-trigger').click();
    });

    /* change le fichier css pour le theme sélectionné */
    $('#color-options a').on('click', function (e) {
        var $styleSheet = $(this).attr('data-style');

        $('#theme-style').attr('href', $styleSheet);

        var $listItem = $(this).closest('li');
        $listItem.addClass('active');
        $listItem.siblings().removeClass('active');

        e.preventDefault();

    });
	/* ======= FIN - THEME CONFIG PANEL ====== */
	
	/* Pour une animation des sections lors du scrolling de la page */
	/*ScrollReveal().reveal('.tile, .section, .item', {
		interval: 4,
		delay: 200,
		reset: true
	});*/
	

    /* Pour ouvrir ou fermer le sous-detail expérience */
    $(".action-sousDetail, .action-skill").click(function () {
        var id = "#" + $(this).data("id");
        var child = $(this).children();

        $(id).slideToggle("slow", function () {
            if ($(id).is(":hidden")) {
                if ($(child).hasClass("fa-angle-double-up")) {
                    $(child).removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
                }
            } else {
                if ($(child).hasClass("fa-angle-double-down")) {
                    $(child).removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
                }
            }
        });

    });
	
	/* Un défilement animé (« Smooth scroll ») */
	$('.smoothscroll,.scrollTo').on('click', function() { // Au clic sur un élément
			var page = $(this).attr('href'); // Page cible
			var speed = 750; // Durée de l'animation (en ms)
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
			//scrollLeft: $(page).offset().left <-- horizontal
			return false;
	});

    $(".main-wrapper").jumpto({
        firstLevel: "> h2", // You can define which tag will represent your first level header. The default value is the <h2> tag. Any <h2> tag will automatically be used as a first level link in the menu.
        secondLevel: "> h3", // We also support submenu. Like above, you can define the selector for the second level header to be used in the submenu. Default is false.
        innerWrapper: ".jumpto-block", // In case you want to switch the section wrapper class name to something else
        offset: 400, // You can define how many pixels until the jump to menu starts to follow you on scroll. Default is 400 pixels.
        animate: 1000, // You can define how fast/slow the page will scroll when the jump to menu is clicked. Set to false to turn off animation.
        navContainer: false, // If you want to place your jump to menu somewhere else, simply add a selector to your predefined jump to menu container here. The default is false and it will automatically be generated.
        anchorTopPadding: 20, // This option let you set the top padding when the jump to menu is clicked. This will let you control the space between your header and the top of the page. Default is 20 pixels.
        showTitle: "Navigation", // You can customize the title of the jump to menu here. Set to false if you want to hide the title
        closeButton: true // You can choose to show/hide the close button by toggling this to true/false respectively
    });

});
