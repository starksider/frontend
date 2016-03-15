'use strict';

/**
 * Created by Andrey on 13.03.2016.
 */

function consoleView() {
    var desc = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var renderItems = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    if (Array.isArray(desc)) {
        renderItems = desc;
        desc = '';
    }
    var result = '',
        count = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = renderItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value;
            var text = _step$value.text;
            var date = _step$value.date;

            result += count + '. ' + text + ' - date: ' + date + '\n';
            count++;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    console.log(desc + result);
}

function TodoList() {
    var viewMode = arguments.length <= 0 || arguments[0] === undefined ? consoleView : arguments[0];

    this.view = viewMode;
    this.messages = [];
};

TodoList.prototype = {
    add: function add() {
        for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
            items[_key] = arguments[_key];
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                this.messages.push({ text: item, date: new Date().getMilliseconds() });
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return this;
    },
    remove: function remove() {
        var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        var prevIndex = void 0,
            deleted = [],
            messages = this.messages;

        for (var _len2 = arguments.length, indexes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            indexes[_key2 - 1] = arguments[_key2];
        }

        indexes.push(index);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = indexes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var i = _step3.value;

                if (prevIndex === i) continue;
                deleted.push(messages[i]);
                delete messages[i];
                prevIndex = i;
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        this.messages = messages.filter(function () {
            return true;
        });
        this.view('Removed item' + (deleted.length > 1 ? 's' : '') + ': ', deleted);

        return deleted;
    },
    find: function find(match) {
        var result = [];

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = this.messages[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;

                if (item.text.indexOf(match) > -1) {
                    result.push(item);
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        this.view('Matched item' + (result.length > 1 ? 's' : '') + ': ', result);
        return result;
    },
    display: function display() {
        this.view(this.messages);
    }
};

var todo = new TodoList();

todo.add("1asd1sd", "2asdaswdad", "3wqewefwfw", "4qwewefdw1d").display();
todo.find("asd");
todo.remove(1, 1, 1);
todo.display();
//# sourceMappingURL=todolist.js.map