// map
let map = L.map('map').setView([22.725430117192175, 120.31453259468755], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([22.725430117192175, 120.31453259468755]).addTo(map).openPopup();

const btnMenu = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
const allLinks = document.querySelectorAll('a:link');
const sectionHeroEl = document.querySelector('.section-hero');

// mobile menu
btnMenu.addEventListener('click', function (e) {
	e.preventDefault();
	headerEl.classList.toggle('nav-open');
});

// smooth scrolling

allLinks.forEach(link =>
	link.addEventListener('click', function (e) {
		const href = link.getAttribute('href');

		if (href === '#') {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}

		if (href !== '#' && href.startsWith('#')) {
			e.preventDefault();
			const section = document.querySelector(href);
			section.scrollIntoView({ behavior: 'smooth' });
		}

		if (link.classList.contains('header-nav-link')) {
			e.preventDefault();
			headerEl.classList.toggle('nav-open');
		}
	})
);

// sticky navigation
const obs = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];

		if (!ent.isIntersecting) {
			document.body.classList.add('sticky');
		}

		if (ent.isIntersecting) {
			document.body.classList.remove('sticky');
		}
	},
	{
		root: null,
		threshold: 0,
		rootMargin: '-80px',
	}
);
obs.observe(sectionHeroEl);

// slider

const slider = function () {
	const projects = document.querySelectorAll('.project');
	const btnLeft = document.querySelector('.btn-carousel--left');
	const btnRight = document.querySelector('.btn-carousel--right');
	const dots = document.querySelector('.dots');

	let currSlide = 0;
	const maxSlide = projects.length - 1;

	// create dots
	const createDots = function () {
		projects.forEach((_, i) => {
			dots.insertAdjacentHTML('beforeend', `<button class="dot" data-slide="${i}" aria-label="carousel dot">&nbsp;</button>`);
		});
	};

	//dots filled
	const activateDots = function (slide) {
		document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('dot-fills'));
		document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('dot-fills');
	};

	// go slide
	const goToSlide = function (slide) {
		projects.forEach((s, i) => {
			s.style.transform = `translateX(${(i - slide) * 100 - 50}%)`;
		});
		activateDots(slide);
	};

	// initial function
	const init = function () {
		createDots();
		goToSlide(0);
	};

	init();

	const nextSlide = function () {
		currSlide = currSlide === maxSlide ? 0 : currSlide + 1;
		goToSlide(currSlide);
	};

	const prevSlide = function () {
		currSlide = currSlide === 0 ? maxSlide : currSlide - 1;
		goToSlide(currSlide);
	};

	btnRight.addEventListener('click', nextSlide);
	btnLeft.addEventListener('click', prevSlide);

	dots.addEventListener('click', function (e) {
		if (!e.target.classList.contains('dot')) return;

		const { slide } = e.target.dataset;
		goToSlide(slide);
	});
};

slider();
