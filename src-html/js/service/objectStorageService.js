function ObjectStorageService() {
	this.entryList = [];
}

ObjectStorageService.prototype.persistEntryList = function() {
	this.entryList.sort(
			function(a, b) {
				if (a.done == b.done) {
					return a.name.localeCompare(b.name);
				} else {
					return a.done ? 1 : -1;
				}
			});
	localStorage["ShoppingList_entryList"] = angular.toJson(this.entryList);	
}

ObjectStorageService.prototype.addEntry = function(entry) {
	this.entryList.push(entry);
	this.persistEntryList();
}

ObjectStorageService.prototype.removeEntry = function(entry) {
	var position = this.entryList.indexOf(entry);
	this.entryList.splice(position, 1);
	this.persistEntryList();
}

ObjectStorageService.prototype.init = function() {
	this.loadObjectsFromLocalStore();
};

ObjectStorageService.prototype.loadObjectsFromLocalStore = function() {
	this.loadListFromLocalStorage("entryList", Entry);
};

ObjectStorageService.prototype.loadValueFromStorage = function(name) {
    var variable = localStorage["ShoppingList_"+name];
    if (variable != undefined) {
        this[name] = variable;
    } else {
    	this[name] = 0;
    }
};

ObjectStorageService.prototype.loadListFromLocalStorage = function (storageKey, constructor) {
    var listsStringRepresentation = localStorage["ShoppingList_"+storageKey];
    if (listsStringRepresentation != undefined) {
        var listDeserialized = angular.fromJson(listsStringRepresentation);
        var length = listDeserialized.length;
        for (var i = 0; i < length; i++) {
            var deserialized = new constructor(listDeserialized[i], this);
            this[storageKey].push(deserialized);
        }
    }
};

ObjectStorageService.prototype.updateByIdentificator = function(object, list, identificator) {
	var existing = this.findObjectBy(object[identificator], list, identificator);
	if (existing != null) {
		existing.update(object, this);
	} else {
    	list.push(object);
	}
};

ObjectStorageService.prototype.findObjectBy = function(id, list, identificator) {
	var matched = null;
	var length = list.length;
    for (var i = 0; i < length; i++) {
    	var existing = list[i];
    	if (id == existing[identificator]) {
    		matched = existing;
    	}
	}
	return matched;
};

ObjectStorageService.prototype.findEnumBy = function(name, list) {
	var matched = null;
	var length = list.length;
    for (var i = 0; i < length; i++) {
    	var existing = list[i];
    	if (name == existing.name) {
    		matched = existing;
    	}
	}
	return matched;
};