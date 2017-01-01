var SmartWebSocket = (function() {
    let makeEventFunc = (eventName) => function(callback) {
        this.ws.addEventListener(eventName, (e) => this._invoke(callback, e), false);
        return this;
    };

    let makeGetter = (attributeName) => function() {
        return this.ws[attributeName]
    };

    let capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    class SmartWebSocket {

        constructor(uri, protocols) {
            this.ws = new WebSocket(uri, protocols);
        }

        _invoke(callback, event) {
            callback.call(this, event, this);
        }

        isOpen() {
            return this.getReadyState() === WebSocket.OPEN;
        }

        close() {
            if (this.isOpen()) {
                this.ws.close();
            } else {
                this.onOpen(function() {
                    this.ws.close();
                });
            }
            return this;
        }

        send(message) {
            if (typeof message == 'object') {
                message = JSON.stringify(message);
            }
            if (this.isOpen()) {
                this.ws.send(message);
            } else {
                this.onOpen(function() {
                    this.ws.send(message);
                });
            }
            return this;
        }
    }


    ['close', 'error', 'message', 'open'].forEach(
        (eventName) =>
        SmartWebSocket.prototype['on' + capitalize(eventName)] = makeEventFunc(eventName)
    );

    ['binaryType', 'bufferedAmount', 'extensions', 'protocol', 'readyState', 'url'].forEach(
        (attributeName) =>
        SmartWebSocket.prototype['get' + capitalize(attributeName)] = makeGetter(attributeName)
    );

    return SmartWebSocket;

})();
