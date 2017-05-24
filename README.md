#Method list

* onClose, onError, onMessage,onOpen (to attach event listener)
* getBinaryType, getBufferedAmount, getExtensions, getProtocol, getReadyState, getUrl (to get websocket properties)
* isOpen (returns true if websocket is opened, else return false)
* close (close the websocket)
* send(message) (send message to server)

```
//example
(function() {
    var sws = new SmartWebSocket('ws://127.0.0.1:8000');
    sws.onMessage(function(e, sws) {
        console.log('on message 1 called, data: ' + e.data);
    }).onMessage(function(e, sws) {
        console.log('on message 2 called, data: ' + e.data);
    }).send('hello,world').send('hello,world 2');
})();
```
