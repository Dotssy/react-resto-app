const menuLoaded = (newMenu) => {
	return {
		action: "MENU_LOADED",
		payload: newMenu
	};
};

export {
	menuLoaded
};