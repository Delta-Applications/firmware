function inView(el, cn = document.body) {
	const b = {
		ct: cn.scrollTop,
		cb: cn.scrollTop + cn.clientHeight,
		et: el.offsetTop,
		eb: el.offsetTop + el.clientHeight,
	};
	return b.eb <= b.cb && b.et >= b.ct;
}
function getSystemSetting(key, successCb, errorCb) {
	var e = navigator.mozSettings.createLock().get(key);
	e.onsuccess = function () {
		successCb(e.result[key]);
	};
	e.onerror = errorCb;
}
function setSystemSetting(key, value, successCb, errorCb) {
	var setting = {};
	setting[key] = value;
	var e = navigator.mozSettings.createLock().set(setting);
	e.onsuccess = successCb;
	e.onerror = errorCb;
}
function toaster(text) {
	navigator.mozApps.getSelf().onsuccess = function (e) {
		var app = e.target.result;
		app.connect("systoaster").then(function (conns) {
			conns.forEach(function (conn) {
				conn.postMessage({ message: text });
			});
		});
	};
}

let req = navigator.mozApps.mgmt.getAll();
req.onsuccess = function () {
	req.result.forEach((app) => {
		if (app.manifest.role != "homescreen") return;
		const manifest = app.manifest;
		let src = (() => {
			let origin = app.origin;
			if ("icons" in manifest) {
				const { icons } = manifest;
				let keys = Object.keys(manifest.icons);
				if (keys.length == 0) return null;
				keys.sort((a, b) => b - a);
				let src = keys.find((a) => a <= 40);
				if (!src) src = keys[keys.length - 1];
				// if icon is a link or data uri
				if (/^(?:http|https|data|app):/.test(icons[src])) return icons[src];
				else if (origin) {
					return origin + icons[src];
				}
				return null;
			} else return null;
		})();
		let name = (() => {
			let lang = navigator.language;
			if (manifest.locales && manifest.locales[lang] && manifest.locales[lang].name) return manifest.locales[lang].name;
			else if (manifest.display) return manifest.display;
			else return manifest.name;
		})();
		if (src == null) src = "app://settings.gaiamobile.org/style/images/default.png";
		const li = document.createElement("ul");
		li.innerHTML = `<li data-manifest="${app.manifestURL}" tabindex="0"><a><img src="${src}" /><span>${name}</span></a></li>`;
		document.getElementById("listo").appendChild(li.firstChild);
	});
	document.getElementById("listo").firstChild.focus();
};
req.onerror = function () {
	// Convert the DOMException to a human-readable error
	alert(new Error(this.error.name + " " + this.error.message));
};

window.onkeydown = (e) => {
	const key = e.key;
	if (key.includes("Enter")) {
		const manifestURL = document.activeElement.dataset.manifest,
			key = "homescreen.manifestURL",
			name = document.activeElement.innerText;
		getSystemSetting(
			key,
			(a) => {
				if (a == manifestURL) toaster(name + " is already the launcher being used.");
				else {
					setSystemSetting(
						key,
						manifestURL,
						() => {
							toaster(name + " is now the launcher, reboot might be required.");
						},
						(a) => alert(a)
					);
				}
			},
			(a) => alert(a)
		);
	}
	if (key.includes("Arrow")) {
		// handle 0 and last
		function if_0(current, nav, list) {
			return (current > 0 && nav == -1) || (current < list.length - 1 && nav == 1);
		}
		// handle normal scenario
		function if_1(current, nav, list) {
			return (current == 0 && nav == -1) || current == list.length - 1;
		}
		if (/Up|Down/.test(key)) {
			// scroll
			e.preventDefault();
			const list = Array.from(document.querySelectorAll("#listo li")),
				nav = key == "ArrowUp" ? -1 : 1,
				current = list.indexOf(document.activeElement),
				focusEl = (indexu) => {
					const nextIndex = indexu,
						next = list[nextIndex];
					next.focus();
					if (nextIndex == 0) next.scrollIntoView({ block: "end" });
					else if (!inView(next, document.getElementById("listo_con"))) next.scrollIntoView(nav != 1);
				};
			if (current == -1) focusEl(0);
			else if (if_0(current, nav, list)) focusEl(current + nav);
			else if (if_1(current, nav, list)) focusEl(current == 0 ? list.length - 1 : 0);
		}
	}
};
