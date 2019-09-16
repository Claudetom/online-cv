var textWatermark = "En recherche";

function watermark(text) {
	var body = document.getElementsByTagName('body')[0];
	var bg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='100px' width='100px'>" +
	"<text transform='translate(20, 100) rotate(-45)' fill=' rgb(211,211,211)' font-size='20'>" + text + "</text></svg>\")";
	
	var bg2 = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='100px' width='100px'>" +
	"<text transform='translate(20, 100) rotate(-45)' fill=' rgba(211,211,211, 0.4)' font-size='20'>" + text + "</text></svg>\")";
	
	body.style.backgroundImage = bg;
	$('.main-wrapper').css('background-image', bg2);
}

$(document).ready(function () {

    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function () {

        $('.level-bar-inner').each(function () {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });
    });

	watermark(textWatermark);
	
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
	
	/* Génération du fichier Pdf du contenu Html
		https://www.freakyjolly.com/jspdf-multipage-example-generate-multipage-pdf-using-single-canvas-of-html-document-using-jspdf/
	*/
	function getPDF_old(){
		//$(".genPdf").show();
		var elemPdf = $('.wrapper');
		var HTML_Width = $(elemPdf).width();
		var HTML_Height = $(elemPdf).height();
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.2)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		
		html2canvas($(elemPdf)[0],{allowTaint:true}).then(function(canvas) {
			canvas.getContext('2d');
			
			console.log(canvas.height+"  "+canvas.width);
			
			
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
		    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			
			
			for (var i = 1; i <= totalPDFPages; i++) { 
				pdf.addPage(PDF_Width, PDF_Height);
				pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			}
			
		    pdf.save("CV-ThomasClaude.pdf");
			
			setTimeout(function(){ 			
				//$(".genPdf").hide();
			}, 0);

        });
	};
	
	/* Génération du fichier Pdf du contenu Html
		https://code-examples.net/fr/q/2078fa4
		http://pdfmake.org/playground.html
	*/
	function getPDF(){
		html2canvas(document.getElementById('Top'), {
			onrendered: function (canvas) {
				var data = canvas.toDataURL();
				var docDefinition = {
					content: [{
						image: data,
						width: 500,
					}]
				};
				//pdfMake.createPdf(docDefinition).print();
				//pdfMake.createPdf(docDefinition).download("CV-ThomasClaude.pdf");
				/*var pdf = pdfmake.createPdf(docDefinition);
				pdf.save("CV-ThomasClaude.pdf");*/
				//pdf.write('pdfs/CV-ThomasClaude.pdf');
			}
		});
		
	};

	
	$('.printPdf').click(function () {   
		getPDF();
	});


});
