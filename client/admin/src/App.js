import './assets/css/styles.css';
import './assets/fonts/fontawesome5-overrides.min.css';
import './assets/css/bootstrap.min.css';

import React, { useEffect } from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import RoomsDashboard from './components/rooms/RoomsDashboard';
import UsersDashboard from './components/users/UsersDashboard';
import Profile from './components/profile/Profile';
import Settings from './components/admin-settings/Settings';

import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar'
import NavBar from './components/layout/NavBar';
import NotFound from './components/layout/NotFound';


const App = () => {

  useEffect(() => {
    $(function () {
      "use strict"; // Start of use strict

      // Toggle the side navigation
      $("#sidebarToggle").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          $('.sidebar-menu-text').hide();
        } else {
          $('.sidebar-menu-text').show();
        };
      });

      $("#sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
      });

      //Toggle charts

      $('#electricity-chart').show();
      $('#help-chart').hide();
      $('#socializing-chart').hide();

      $('#toggle-electricity-chart').on('click', e => {
        $('#graph-title').html('Electricity consumption');
        $('#electricity-chart').show();
        $('#help-chart').hide();
        $('#socializing-chart').hide();
      });

      $('#toggle-help-chart').on('click', e => {
        $('#graph-title').html('Help requests');
        $('#help-chart').show();
        $('#electricity-chart').hide();
        $('#socializing-chart').hide();
      });

      $('#toggle-socializing-chart').on('click', e => {
        $('#graph-title').html('Social activity');
        $('#socializing-chart').show();
        $('#help-chart').hide();
        $('#electricity-chart').hide();
      });

      //Sidebar description text disappears when below 768px
      if ($(window).width() < 768) {
        $('.sidebar-menu-text').hide();
      } else {
        $('.sidebar-menu-text').show();
      }

      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      });

    }); // End of use strict
  }, []);

  return (
    <div id="wrapper">
      <Router>
        <Sidebar />
        <div class="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <NavBar />
            <Switch>
              <Route exact path='/admin/dashboard' component={Dashboard} />
              <Route exact path='/admin/rooms' component={RoomsDashboard} />
              <Route exact path='/admin/profile/:userId' component={Profile} />
              <Route exact path='/admin/settings' component={Settings} />
              <Route exact path='/admin/users' component={UsersDashboard} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}


export default App;
