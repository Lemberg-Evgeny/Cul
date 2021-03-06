window.onload = () => {

    const msg = document.getElementById('msg');
    const status = document.getElementById('status');
    const btnSend = document.getElementById('btnSend');
    const btnClose = document.getElementById('btnClose');


    btnSend.onclick = () => {
        if (socket.readyState === WebSocket.OPEN) {

            socket.send(msg.value);
            console.log(msg.value);
        }
    }

    btnClose.onclick = () => {
        if (socket.readyState === WebSocket.OPEN) {

            socket.close();
            console.log('соединение разорвано');
            status.innerHTML = '<br/>соединение разорвано';
        }
    }

    const newLocal = 'ws://localhost:5500';
    // const socket = new WebSocket('ws://echo.websocket.org');
    const socket = new WebSocket(newLocal);

    socket.onopen = (event) => {
        console.log('Подключено к сокету');
        status.innerHTML = 'Подключено к сокету<br/>';

    }

    socket.onmessage = (event) => {
        if (typeof event.data === 'string') {
            status.innerHTML += '<br/>' + event.data;
        } else {
            status.innerHTML = 'полученый тип данных не строка';
        }
        event.send('ggggggggggggggggggg');
    }

    socket.onerror = (event) => {

        console.log('ERROR ' + event.reason);

    }

    socket.onclose = (event) => {
        if (event.wasClean) {
            status.innerHTML = 'Соединение закрыто корректно';
            console.log('Соединение закрыто корректно');
        } else {
            status.innerHTML = 'Соединение закрыто с ошибкой ' + 'Код: ' + event.code + '<br/> описание ошибки: ' + event.reason;
            console.log('Соединение закрыто с ошибкой ' + 'Код: ' + event.code + ' описание ошибки: ' + event.reason);
        }
    }
}