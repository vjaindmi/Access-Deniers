declare var window;

/**
 * Initialize the ionic.native Angular module if we're running in ng1.
 * This iterates through the list of registered plugins and dynamically
 * creates Angular 1 services of the form $cordovaSERVICE, ex: $cordovaStatusBar.
 */
export function initAngular1(plugins) {
  if (window.angular) {

    const ngModule = window.angular.module('ionic.native', []);

    for (var name in plugins) {
      let serviceName = '$cordova' + name;
      let cls = plugins[name];

      (function(serviceName, cls, name) {
        ngModule.service(serviceName, [function() {
          var funcs = window.angular.copy(cls);
          funcs.prototype['name'] = name;
          return funcs;
        }]);
      })(serviceName, cls, name);
    }
  }
}
