gsap.registerPlugin(ScrollTrigger);

// ——————————————————————————————————————————————————
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar - https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp*/
var prevScrollpos = window.scrollY;
window.onscroll = function() {
var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};
// ——————————————————————————————————————————————————
// Scroll Icon Functionality
document.querySelector('.scroll-icon-container').addEventListener('click', () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
        nextSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// ——————————————————————————————————————————————————
// TextScramble (https://codepen.io/soulwire/pen/mEMPrK)
class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  const phrases = [
    'THE ATACAMA DESERT',
    'a fashion dump'
  ];
  const el = document.querySelector('#hero-text');
  const fx = new TextScramble(el);
  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800);
    });
    counter = (counter + 1) % phrases.length;
  };
  next();

// ——————————————————————————————————————————————————
// COMPARISON IMG SCROLL (https://codepen.io/GreenSock/pen/oNjgEjm)
gsap.utils.toArray(".comparisonSection").forEach(section => {
	let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "center center",
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
				end: () => "+=" + section.offsetWidth, 
				scrub: true,
				pin: true,
        anticipatePin: 1
			},
			defaults: {ease:"none"}
		});
	// animate the container one way...
	tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
	  // ...and the image the opposite way (at the same time)
	  .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
});

// Progressive reveal effect based on scroll position
document.addEventListener("scroll", function() {
    const aboutSection = document.querySelector("#about .overlayInfo");
    const sectionPosition = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate the progress of the section within the viewport
    const revealPoint = Math.max(0, Math.min(1, 1 - sectionPosition.top / windowHeight));
    
    // Update opacity and scale based on the calculated progress
    aboutSection.style.opacity = revealPoint; // Ranges from 0 (hidden) to 1 (fully visible)
    aboutSection.style.transform = `scale(${0.8 + revealPoint * 0.2})`; // Scale from 0.8 to 1
});

// Scramble text (https://codepen.io/GreenSock/pen/jOxpVw)
gsap.registerPlugin(ScrambleTextPlugin);
var tl = gsap.timeline({defaults: {duration: 1, ease: "none"}});
    tl.to("#tons", {duration: 4, scrambleText:{text:"39,000", chars:"0123456789", revealDelay:0.5, tweenLength:false, speed:2}})
    .to("#carbon", {duration: 3, scrambleText:{text:"10", chars:"0123456789", revealDelay:0, tweenLength:false, speed:2}})
    .to("#water", {duration: 3, scrambleText:{text:"20", chars:"0123456789", revealDelay:0, tweenLength:false, speed:2}});

GSDevTools.create({animation: tl, minimal: true});

// Parallax scroll gallery (https://codepen.io/Punkrazio/pen/bGVNzdE) - attempted but not working :(
$(window).on('load', function()
{
	parallax(document.getElementById('level1'), -1.5, -4800);
	parallax(document.getElementById('level2'), -1, -2900);
	parallax(document.getElementById('level3'), -1.3, 200);
});
$('body').on('mousewheel DOMMouseScroll MozMousePixelScroll wheel', function(e)
{

	if ( e.originalEvent.wheelDelta !== undefined )
	{
		parallax(document.getElementById('level1'), -1.5, e.originalEvent.wheelDelta);
		parallax(document.getElementById('level2'), -1, e.originalEvent.wheelDelta);
		parallax(document.getElementById('level3'), -1.3, e.originalEvent.wheelDelta);

	}else if ( e.originalEvent.deltaY !== undefined )
	{
		parallax(document.getElementById('level1'), -1.5, (e.originalEvent.deltaY * (-30)));
		parallax(document.getElementById('level2'), -1, (e.originalEvent.deltaY * (-30)));
		parallax(document.getElementById('level3'), -1.3, (e.originalEvent.deltaY * (-30)));
	}
});
function parallax(target, layer, scrollinit) 
{
    var layer_coeff = 10 / layer;
    scroll = scroll + ( parseInt(scrollinit) );
	
    // var y = ($(window).height() - target.offsetHeight) / 2 - (scroll - ($(window).height() / 2)) / layer_coeff;
    var y 		= ( $(window).height() / 2 ) - (scroll - ($(window).height() / 2)) / layer_coeff;
    var scarto 	= target.offsetHeight - $(window).height();

    // Aggiunge sotto la gallery quando si avvicina alla fine della colonna
    if ( ( y < 0 ) && ( Math.abs(y) >= scarto ) )	append_gallery(target);

    if ( ( parseInt(scrollinit) >= 0 ) && ( Math.abs(scroll) < 6000 ) )
    {
    	scroll = scroll - 150;
    	return;
    }	

    $(target).css('marginTop', y);
}
function append_gallery(column)
{
	var container 	= $(column).find('.gallery'),
		items 		= container.children();

	items.clone().appendTo(container);
}