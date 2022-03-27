// do whatever you want, crappy code anyways
(function (window) {
	// if true, will simulate onready and then simulate close ad
	// else will always return error
	const simulateReady = false;

	window.getKaiAd = function (obj) {
		if (obj.onerror && !simulateReady) {
			obj.onerror(12);
		}
		if (obj.onready && simulateReady) {
			obj.onready({
				call: function (arg, options) {
					if (arg != "display") return; // return if not display
					let { container } = obj;
					if (container && container instanceof HTMLElement) {
						container.zIndex = options.zIndex || container.zIndex;
						container.className = options.navClass || container.className;
						container.style.display = options.display || container.style.display;
					}
				},
				on: function (arg, func) {
					if (arg == "display") func();
					if (arg == "close" && !obj.container) setTimeout(func, 500);
				},
			});
		}
	};
})(window);
