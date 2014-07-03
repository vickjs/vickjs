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
			action: 'Product.MAIN',
			actionArgs: { }
		}, {
			label: 'Ember',
			icon: 'fa fa-gamepad',
			action: 'Template.MAIN',
			actionArgs: { }
		}, {
			label: 'Polymer',
			icon: 'fa fa-gift',
			action: 'ObjectStore.MAIN',
			actionArgs: { }
		}, {
			label: 'D3',
			icon: 'fa fa-tasks',
			action: 'ActionLog.MAIN',
			actionArgs: { }
		}, {
			label: 'Backbone',
			icon: 'fa fa-code',
			action: 'ActionLog.MAIN',
			actionArgs: { }
		}, {
			label: 'Knockout',
			icon: 'fa fa-pagelines',
			action: 'ActionLog.MAIN',
			actionArgs: { }
		}, {
			label: 'To Do',
			icon: 'fa fa-check',
			action: 'Todo.MAIN',
			actionArgs: { }
		}];
		this.activeAction = 'Dashboard.MAIN';
	}

	return SidebarViewModel;
});