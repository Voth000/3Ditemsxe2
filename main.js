let activeIndex = 0;
let activeIndex1 = 0;
let activeIndex2 = 0;

function switchButton(event) {
    const buttons = document.querySelectorAll('.main1');
    buttons[activeIndex].classList.remove('active'); 
    if (event.type === 'wheel') {
        activeIndex = (activeIndex + (event.deltaY > 0 ? 1 : -1) + buttons.length) % buttons.length; 
    } else if (event.type === 'mouseover') {
        activeIndex = Array.from(buttons).indexOf(event.target); 
    }
    buttons[activeIndex].classList.add('active'); 

    const boxs = document.querySelectorAll('.main2');
    boxs[activeIndex1].classList.remove('active'); 
    if (event.type === 'wheel') {
        activeIndex1 = (activeIndex1 + (event.deltaY > 0 ? 1 : -1) + boxs.length) % boxs.length; 
    } else if (event.type === 'mouseover') {
        activeIndex1 = Array.from(buttons).indexOf(event.target); 
    }
    boxs[activeIndex1].classList.add('active'); 

    const bebes = document.querySelectorAll('.bebe');
    bebes[activeIndex2].classList.remove('active'); 
    if (event.type === 'wheel') {
        activeIndex2 = (activeIndex2 + (event.deltaY > 0 ? 1 : -1) + bebes.length) % bebes.length; 
    } else if (event.type === 'mouseover') {
      activeIndex2 = Array.from(buttons).indexOf(event.target); 
    }
    bebes[activeIndex2].classList.add('active'); 

    // GSAP animation
    gsap.fromTo(bebes[activeIndex2], 
      { y: -100, opacity: 0 }, 
      { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: "power2.out"
      }
  );

    setTimeout(() => {
        buttons[activeIndex].classList.add('active');
        boxs[activeIndex1].classList.add('active');
        bebes[activeIndex2].classList.add('active');
    }, 20); 
}


window.addEventListener('wheel', switchButton);


const buttons = document.querySelectorAll('.main1');
buttons.forEach(button => {
    button.addEventListener('mouseover', switchButton);
});

var dotLimit = 2000;
  var dots = [];
onmousemove = function(e){
 
  document.onmousemove = function(e) {
    // Create a new dot
    var dot = document.createElement('div');
    dot.className = "dot";
    dot.style.left = e.pageX + "px";
    dot.style.top = e.pageY + "px";
    document.body.appendChild(dot);

    // Add the new dot to the dots array
    dots.push(dot);

    // Check if the number of dots exceeds the limit
    if (dots.length > dotLimit) {
      // Remove the oldest dot from the DOM and the array
      var oldestDot = dots.shift();
      document.body.removeChild(oldestDot);
    } 
  };
};

document.addEventListener("DOMContentLoaded", function() {
  var videos = document.querySelectorAll('video'); // Select all video elements
  var flElement = document.querySelector('.fl');

  if (videos.length > 0 && flElement) {
    videos.forEach(function(video) {
      video.addEventListener('mousemove', function(e) {
        flElement.style.display = 'block';
        flElement.style.left = e.pageX + 10 + 'px'; // 10px offset for better visibility
        flElement.style.top = e.pageY + 10 + 'px'; // 10px offset for better visibility
      });

      video.addEventListener('mouseleave', function() {
        flElement.style.display = 'none';
      });
    });
  } else {
    console.error('No video elements or the .fl element are not found in the DOM.');
  }
});