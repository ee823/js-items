'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

// e.preventDafault()防止事件的默认行为发生，而<a>标签是一个链接，默认行为：单击它跳转到链接的指定页面面，而我们需要的是打开模态框所以使用e.preventDafault()阻止默认行为，以免页面跳转。
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// forEach()方法可以迭代一个数组的元素并未每一个元素执行一个指定的操作，这个操作可以是一个函数。btnsOpenModal是一个类数组对象，包含多个按钮元素。forEach()方法啊会为每一个按钮元素添加一个点击事件，并将openModal函数分配给该监听器
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
/*被替换的代码
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}
*/

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////
//Button scrolling
// btnScrollTo.addEventListener('click', function (e) {
//   const slcoords = section1.getBoundingClientRect();
//   console.log(slcoords);
//   console.log(e.target.getBoundingClientRect());
//   console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   //Scroll
//   // window.scrollTo(
//   //   slcoords.left + window.pageXOffset,
//   //   slcoords.top + window.pageYOffset
//   // );

//   //   window.scrollTo({
//   //     left: slcoords.left + window.pageXOffset,
//   //     top: slcoords.top + window.pageYOffset,
//   //     behavior: 'smooth',
//   //   });
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

//////////////////////////////////////////////////////
//页面导航Page navigation（平滑滚动）

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//1.(将事件监听器添加到公共父元素)Add event listener to common parent element
//2.(确定事件的触发元素)Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);

  //匹配策略Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//e.target是为了获取触发事件的目标元素

///////////////////////////////////////////////////////////
//标签式组件Tabbed component

//为容器添加一个点击事件
tabsContainer.addEventListener('click', function (e) {
  //再点击事件的回调函数中，通过e.target获取触发点击事件的元素，并使用closest（‘operations__tab')方法找到最接近的具有operations__tab类的父元素，并将其存储在clicked变量中
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //保护机制
  if (!clicked) return;

  //移除初始化定义的选项标签作用
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //作用中的选项卡
  clicked.classList.add('operations__tab--active');

  //作用中的选项卡内容区域
  // clicked.classList.add('operations__content--active');//ERROR
  //note:不能直接在选项卡上添加operations__content--active类 。因为这个类名是用来标记内容区域，而不是选项卡本身。
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////////////////////
//悬停选项栏时，其他选项淡出 Menu fade animation
const handleHover = function (e, opacity) {
  console.log(this, e.currentTarget);
  //使用classList.contains()方法时，应该将类名作为字符串传递给该函数
  //对于DOM元素的类名，点号（.）适用于选择器中的表示类选择器的符号，但在类名字符串中不需要包含它
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// nav.addEventListener('mouseover', handleHover(e, 0.5));//Error
//原始写法
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
nav.addEventListener('mouseover', handleHover.bind(0.5));
//利用bind()方法创建一个新的函数，并将指定的对象0.5绑定为新函数执行的this值
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////////////////////
//固定导航sticky navigation(当向下滚动到一定的程度时，顶部导航栏将附加到页面顶部)
// const initialCoords = section1.getBoundingClientRect();
// console.log('****');
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//////////////////////////////////////
//Sticky navigation: Intersection Observer API（交叉观察期API）
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   //定义一个阈值，值是百分比，10%，即当目标元素的可见比例要大于10%时才会触发回调函数
//   // threshold: 0.1,
//   //当目标元素的可见比列至少要达到0%或百分之25%时触发回调函数
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //rootMargin表示在计算目标元素与根参考元素或视口之间的交叉区域时，额外添加一个边距区域。
  //-90px说明在目标元素与视口之间添加了一个-90px的边距，边距值为负，则会将边距区域扩展到目标元素的外围
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////////////////////////
//header容器下方footer容器上方元素实现滚动加载显示
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////
// lazing loading images
// const imgTargets = document.querySelectorAll('img[data-src]');
// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) return;

//   //replace src with data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };
// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });
// imgTargets.forEach(img => imgObserver.observe(img));

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  //数组解构，从entries中提取第一个元素，并将其值赋值给entry变量。
  //entries是传递给回调函数的交叉状态变化的条目集合。
  const [entry] = entries;

  //保护机制
  if (!entry.isIntersecting) return;
  //如果目标元素与视口相交。则将目标元素的src替换成data-src属性的值
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////////////
//轮播图Slides
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  //事件处理程序Event handler
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key == 'ArrowRight' && nextSlide();
  });
  //-200%,-100%,0%,100%

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

//下述两端代码都用于HTML元素的方法，但使用的语法不同
/*
通过css选择器语法来选择元素
querySelector方法返回匹配的第一个元素，querySelectorAll方法返回所有匹配的元素。
*/
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
// /*
// 使用传统的DOM选择方法
// getElementById和getElementByTagName返回具有指定的ID和标记名称的单个元素或元素列表。
// */
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// //Creating and inserting elements
// //.insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   '我们使用Cookie来提高功能性和分析能力。 <button class="btn btn--close-cookie">已读😊</button>';

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// //querySelector获取类名需要在类名前加上符号‘ . ’
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.parentElement.removeChild(message);
//   });

// //Style
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');
/*
1：document.documentElement表示根元素，style表示根元素的样式表对象，setProperty用于设置根元素中的css变量“--color-primary”的值
2：setProperty接收两个参数，一个是要设置的css属性名称，一个是第一个参数要设置的值
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Atteibutes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log('88888');
// console.log(logo.className);
// logo.alt = 'Beautiful minimalist logo';

// //Non-standard
// console.log(logo.designer);
// /*
// designer属性是一个JS对象属性，尽管在HTML元素中有名为designer的属性，但JS对象属性会覆盖同名的HTML属性名。因此，logo.designer不能获取到designer的属性值，而是JS对象属性值，因为定义中没有显示designerJS对象属性值，所以返回undefined
// */
// console.log(logo.getAttribute('designer'));
// /*
// .getAtrribute()该方法可以获取HTNL元素在HTML中指定的属性值，不受JS对象属性影响。因此无论是否存在JS对象属性，都能够获取自定义的属性值。如果没有设置其值，那么就会返回null
// */
// // logo.setAtrribute('company', 'Bankist');
// /*
// setAtrribute()方法用于设置HTML元素的属性，接受两个参数：第一个属性名称，第二个参数是属性值。
// 这句代码的作用：将在名为logo的HTML元素上设置company属性，并为其赋值Bankist属性。若元素原本就有company属性，则会使用setAtrribute方法吧原有的属性值覆盖成Bankist。
// */

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //Data attributes
// console.log(logo.dataset.versionNumber);

// //Classes
// /*
// classList是JS中用于处理HTML元素类的属性，它是一个只读属性，返回一个元素类名的列表，可以使用它来添加，移除或切换一个或多个类。
// */
// logo.classList.add('c', 'j');
// // (className1,className2,...)指定一个或多个类名添加到元素的类列表中，若类名已存在则不会添加。
// logo.classList.remove('c', 'j');
// // (className1,className2,...)从元素中删除指定的一个或多个类名
// logo.classList.toggle('c');
// // (className,force)如果存在（不存在）指定的类名则删除（添加），可选的force参数是一个布尔值，指示添加或删除类（非切换），若为true则添加类，否则删除类。
// logo.classList.contains('c');
// // (className)若元素类列表包含指定的类名，则返回true，否则返回false
// logo.className = 'jonas';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // 为btnScrollTo按钮添加一个事件监听器，该事件监听器在单击按钮时执行。
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// // 利用document.querySelectir查找带有.btn--scroll-to类的HTML元素，并存储在btnScrollTo变量中
// const section1 = document.querySelector('#section--1');
// // 查找带有#section1的ID，并存储在section1变量中
// btnScrollTo.addEventListener('click', function (e) {
//   const slcoords = section1.getBoundingClientRect();
//   console.log(slcoords);
//   console.log(e.target.getBoundingClientRect());
//   console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   //Scroll
//   // window.scrollTo(
//   //   slcoords.left + window.pageXOffset,
//   //   slcoords.top + window.pageYOffset
//   // );

//   //   window.scrollTo({
//   //     left: slcoords.left + window.pageXOffset,
//   //     top: slcoords.top + window.pageYOffset,
//   //     behavior: 'smooth',
//   //   });
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
// // 将事件监听器附加到btnScrollTo元素，监听元素上的click事件；
// // 使用getBoundingClinetRect()方法获取section1元素的大小和位置信息，并将其存储在slcoords变量中
// //e.target是一个事件对象属性，表示触发事件的元素。当用户单击按钮btnScrollTo按钮时，click事件会触发，并且事件对象会传递给事件监听器。利用e.target来引用 用户单击的btnScrollTo元素，从而获取该元素的大小和位置。
// // 记录当前窗口滚动的 X 和 Y 坐标
// //利用document.documentElement.clientHeight(clientWidth)获取文档元素的高度和宽度属性。仅在可视范围内的高度和宽度。

//////////////////////////////////////////////////
/**实现单击按钮页面平滑滚动至同一窗口目标页面 */
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// btnScrollTo.addEventListener('click', function (e) {
//   const slcoords = section1.getBoundingClientRect();

// 老式平滑滚动
// window.scrollTo({
//   left: slcoords.left + window.pageXOffset,
//   top: slcoords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

// 平滑滚动 新 方法
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
//该监听器函数使用window.scroll()方法滚动窗口至section1元素的位置,滚动过程是平稳的实现视觉上的滚动动画。（behavior: 'smooth')。并将视口的左侧及上方滚动坐标设置为比slcoords左侧和上方坐标更偏移，以便在滚动完成时部分显示元素
// window.pageXOffset属性返回文档执行区域（即浏览器视口)相对于文档左上角的水平偏移量。假设滚动条水平方向的偏移量为scrollX则目标元素的左侧坐标为 scroll + slcoords.left.

/*
`scrollIntoView()` 是一个浏览器自带的方法，可用于将调用该方法的元素滚动到当前视口中。传递元素作为参考时，将滚动调用该方法的元素，使参考元素成为视口的顶部或底部。
- `behavior`(可选)：接受两个值之一：`auto`（默认）和 `'smooth'`。前者表示平滑滚动的效果无效，而后者表示滚动动画应该平稳地显示在屏幕上（即使相同的功能在某些浏览器和其它方法中也可用并具有相同的名称）。
在这个例子中，锚点元素 `section1` 调用了 `scrollIntoView({ behavior: "smooth" })` 方法，表示平滑动画滚动视口使其可见。实现步骤如下：
1. `section1` 元素作为锚点元素，调用 `scrollIntoView()` 方法使其滚动到视口区域。
2. `behavior` 参数被设置为 `"smooth"`，表示滚动过程是平滑的，有动画效果，而不是突然的。
3. 当浏览器执行 `scrollIntoView()` 方法时，它会计算 `section1` 元素相对于视口的位置，然后平滑滚动视口，使元素完全可见。
4. 当滚动动画完成时，`section1` 元素出现在视口中央。
*/
////////////////////////////////////////////////////////
/*事件监听器 */
// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('事件监听器: 您正在阅读标题 🥰');

//对事件监听器进行删除，故alert报警器只能弹出一次，后续不能弹出，因为事件已被删除
// h1.removeEventListener('mouseenter', alertH1);
// };
//mouseenter鼠标悬停时触发事件监听器
// h1.addEventListener('mouseenter', alertH1);

// //3s后删除事件监听器
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // h1.onmouseenter = function (e) {
// //   alert('鼠标悬停时：您正在阅读标题 🥰');
// // };

///////////////////////////////////////////////////////////
/*事件冒泡*/
//rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('like', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); //true
//   //阻止传播
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('apple', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('success', e.target, e.currentTarget);
// },true);
// //使用true参数，将监听器添加到事件捕获阶段中，比在默认的时间冒泡阶段中添加监听器更加灵活，可以控制，单要谨慎使用。
// //true参数表示该监听器将在事件捕获阶段（祖先 向下 目标）中被触发。故当我们点击任何该元素内部的元素时，都会触发该监听器，而且在实际点击目标元素之前，该监听器会先于该元素内部的其他事件处理器执行。

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)';
// //Going sideways siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
// forEach循环遍历数组中的每一个元素并执行指定的回调函数
//回调函数接收一个参数el，表示当前遍历到的子元素
