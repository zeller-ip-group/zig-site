// index.js

import waypoints from 'waypoints/lib/noframework.waypoints.min';
import waypointsInview from 'waypoints/lib/shortcuts/inview.min.js';
import _forEach from 'lodash.foreach';

import contactForm from './components/ContactForm.js'

$('a[href*="#"]:not([href="#"])')
  .click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body')
          .animate({
            scrollTop: target.offset()
              .top
          }, 500);
        return false;
      }
    }
  });


const headerNav = document.querySelector('.HeaderNav');
const setHeaderNavPositionOnScroll = new Waypoint({
  element: headerNav,
  handler: (direction) => {
    if (direction === 'down') {
      headerNav.classList.add('HeaderNav--fixed');
    } else if (direction === 'up') {
      headerNav.classList.remove('HeaderNav--fixed');
    }
  },
});

const pageSections = document.querySelectorAll('[data-sectionName]');
const headerNavItems = document.querySelectorAll('.HeaderNav li');

function addWaypointsToSections(nodeArray) {
  _forEach(nodeArray, function (node, key) {
    new Waypoint({
      element: node,
      handler: function (direction) {
        if (direction === 'down') {
          const currentSectionName = this.element.getAttribute('data-sectionName');
          const currentSectionHeaderNavItem = document
            .querySelector(`.HeaderNav a[href="#${currentSectionName}"]`)
            .parentNode;

          _forEach(headerNavItems, (headerNavItem, key) => {
            headerNavItem.classList.remove('current');
          });

          currentSectionHeaderNavItem.classList.add('current');
        }
      },
      offset: 100,
    });
    new Waypoint.Inview({
      element: node,
      enter: function (direction) {
        if (direction === 'up') {
          const currentSectionName = this.element.getAttribute('data-sectionName');
          const currentSectionHeaderNavItem = document
            .querySelector(`.HeaderNav a[href="#${currentSectionName}"]`)
            .parentNode;

          _forEach(headerNavItems, (headerNavItem, key) => {
            headerNavItem.classList.remove('current');
          });

          currentSectionHeaderNavItem.classList.add('current');
        }
      },
      offset: 100,
    });
  }, this);
}

addWaypointsToSections(pageSections);
contactForm();
