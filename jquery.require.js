(function($) {
	var modules = {};

	/**
	 * @param {Object|URL} src kann mit Rückgabe-Variablennamen erweitert werden (z.B. exports: 'io')
	 * @param {function} cb
	 * @return {jqXHR}
	 */
	$.require = function (src, cb) {
		if (typeof src == 'string') src = {url: src};

		var link = document.createElement("a");
		link.href = src.url;
		src.url = link.href;

		// modul wurde bereits abgefragt
		if (modules[src.url] && typeof modules[src.url].module != "undefined") {
			cb(modules[src.url].module.exports, modules[src.url]);
			return modules[src.url];
		}

		// laden erfolgreich
		var done = function (data, textStatus, jqXHR) {
			if (src.exports) data += "\ntry { exports = "+src.exports+"; } catch(e) {}";
			data += "\n\n//# sourceURL="+src.url;

			modules[src.url].module = {exports: null};
			(function() {
				var module = { exports: null };
				var exports = null;
				var res = eval(data);
				if (!module.exports) module.exports = exports || res;
				modules[src.url].module = module;
				cb(modules[src.url].module.exports, data, textStatus, jqXHR);
			})();
		};

		// laden fehlgeschlagen
		var fail = function (jqXHR, textStatus, errorThrown) {
			modules[src.url].module = {exports: null};
			modules[src.url].textStatus = 'error';
			modules[src.url].error = errorThrown;
			cb(null, modules[src.url]);
		};

		// modul wird geladen
		if (modules[src.url]) {
			modules[src.url].done(done);
			return modules[src.url];
		}

		if (modules[src.url]) {
			if (modules[src.url].module)
				cb(modules[src.url].module.exports);
			else
				modules[src.url].done(done);
		}

		var opt = $.extend({
			dataType: 'text',
			cache: true
		}, src);

		modules[src.url] = $.ajax(opt).done(done).fail(fail);

		return modules[src.url];
	};

	$.require.modules = modules;
})(jQuery);