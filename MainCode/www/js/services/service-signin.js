var signIn = angular.module('MainApp.services.signIn', []);

signIn.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	})

	.constant('USER_ROLES', {
		all: '*',
		admin: 'admin',
		editor: 'editor',
		guest: 'guest'
	})

	.config(function ($httpProvider) {
		$httpProvider.interceptors.push([
			'$injector',
			function ($injector) {
				return $injector.get('AuthInterceptor');
			}
		]);
	})

	.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
		return {
			responseError: function (response) { 
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated,
					403: AUTH_EVENTS.notAuthorized,
					419: AUTH_EVENTS.sessionTimeout,
					440: AUTH_EVENTS.sessionTimeout
				}[response.status], response);
				return $q.reject(response);
			}
		};
	})

	.factory('AccountService', function ($http, Session) {
	    var authService = {};
	   
	    authService.login = function (credentials) {
			return $http({
				method: 'POST',
				url : 'http://sdk108.pe.hu',
				data: credentials
			})
			.then(function (res) {
				Session.create(res.data.id, res.data.user.id, res.data.user.role);
				return res.data.user;
			});
	    };
	   
	    authService.isAuthenticated = function () {
			return !!Session.userId;
	    };
	   
	    authService.isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
	    };

	    return authService;
  	})

	.service('Session', function () {
	    this.create = function (sessionId, userId, userRole) {
			this.id = sessionId;
			this.userId = userId;
			this.userRole = userRole;
	    };

	    this.destroy = function () {
			this.id = null;
			this.userId = null;
			this.userRole = null;
	    };
	    return this;
	});