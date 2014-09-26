define(function () {
	'use strict';

	function SidebarViewModel() {
		this.links = [{
			label: 'Introduction',
			icon: 'fa fa-home',
			action: 'Introduction.MAIN',
			actionArgs: { }
		}, {
			label: 'Angular',
			icon: 'fa fa-html5',
			action: 'Angular.MAIN',
			actionArgs: { }
		}, {
			label: 'Ember',
			icon: 'fa fa-gamepad',
			action: 'Ember.MAIN',
			actionArgs: { }
		}, {
			label: 'Polymer',
			icon: 'fa fa-gift',
			action: 'Polymer.MAIN',
			actionArgs: { }
		}, {
			label: 'React',
			icon: 'fa fa-tasks',
			action: 'React.MAIN',
			actionArgs: { }
		}, {
			label: 'Backbone',
			icon: 'fa fa-code',
			action: 'Backbone.MAIN',
			actionArgs: { }
		}, {
			label: 'Knockout',
			icon: 'fa fa-pagelines',
			action: 'Knockout.MAIN',
			actionArgs: { }
		}, {
			label: 'To Do',
			icon: 'fa fa-check',
			action: 'Todo.MAIN',
			actionArgs: { }
		}];
		this.activeAction = 'Introduction.MAIN';
	}

	SidebarViewModel.prototype.doNavigate = function(action, args) {
		// body...
	};

	return SidebarViewModel;
});