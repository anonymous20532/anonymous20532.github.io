window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    function beautifyVideoCaptions() {
      var captions = document.querySelectorAll('.video-caption');
      for (var i = 0; i < captions.length; i++) {
        var caption = captions[i];
        // If the caption is already structured (e.g., tag + text spans),
        // do not clobber it. This enables custom styling per-carousel.
        if (caption.querySelector('.video-caption-tag') || caption.querySelector('.video-caption-text')) {
          continue;
        }
        var rawText = caption.textContent.trim().replace(/\s+/g, ' ');
        caption.textContent = '';

        var match = rawText.match(/^\[([^\]]+)\]\s*(.*)$/);
        if (match) {
          var tag = document.createElement('span');
          tag.className = 'video-caption-tag';
          tag.textContent = '[' + match[1].trim() + ']';
          caption.appendChild(tag);

          var tail = match[2].trim();
          if (tail.length > 0) {
            var text = document.createElement('span');
            text.className = 'video-caption-text';
            text.textContent = tail;
            caption.appendChild(text);
          }
        } else {
          var plain = document.createElement('span');
          plain.className = 'video-caption-text';
          plain.textContent = rawText;
          caption.appendChild(plain);
        }
      }
    }

    function initMethodOverviewInteractive() {
      var panel = document.getElementById('method-overview-interactive');
      if (!panel) return;

      var setSideByClientX = function(clientX) {
        var rect = panel.getBoundingClientRect();
        var ratio = (clientX - rect.left) / rect.width;
        panel.classList.remove('active-left', 'active-right');
        if (ratio < 0.5) {
          panel.classList.add('active-left');
        } else {
          panel.classList.add('active-right');
        }
      };

      panel.addEventListener('mousemove', function(event) {
        setSideByClientX(event.clientX);
      });

      panel.addEventListener('mouseenter', function(event) {
        setSideByClientX(event.clientX);
      });

      panel.addEventListener('mouseleave', function() {
        panel.classList.remove('active-left', 'active-right');
      });

      panel.addEventListener('touchstart', function(event) {
        if (event.touches && event.touches.length > 0) {
          setSideByClientX(event.touches[0].clientX);
        }
      }, { passive: true });
    }

    beautifyVideoCaptions();
    initMethodOverviewInteractive();

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

    var part2Options = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    };

		// Initialize general carousels (exclude part2/part3, which are single-view).
    var defaultCarousels = bulmaCarousel.attach('.carousel:not(#part2-carousel):not(#part3-carousel)', options);
    var part2Carousels = bulmaCarousel.attach('#part2-carousel', part2Options);
    var part3Carousels = bulmaCarousel.attach('#part3-carousel', part2Options);
    var carousels = defaultCarousels.concat(part2Carousels).concat(part3Carousels);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

})
