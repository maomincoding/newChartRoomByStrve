import { domInfo, h, setData, onMounted } from 'strvejs';
import './style/app.css';

let socket = null;
const path = 'ws://localhost:3000/'; // 服务端地址
const bg = randomRgb();
const name = new Date().getTime().toString();

// 初始化数据
const data = {
    chatArr:[],
    textValue:'',
    chatbox:null,
    textValueDom:null
}


function App() {
	return h/*html*/ `
    <div class="home">
        <div class="content">
            <ul $key="chatBox" class="chat-box">
            ${data.chatArr.map(
                    (item) => h/*html*/ `
                    <li  class="chat-item">
                    ${
                        item.name === name
                        ? h/*html*/ `
                            <div class="chat-msg mine">
                                <p class="msg mineBg msg-m">${item.txt}</p>
                                <p class="user" style="background: ${bg}">
                                    ${useName(item.name)}
                                </p>
                            </div>`
                            : h/*html*/ `
                            <div  class="chat-msg other">
                                <p class="user" style="background:${item.bg}" $key>
                                ${useName(item.name)}
                                </p>
                                <p class="msg otherBg msg-o" $key>${item.txt}</p>
                            </div>
                    `
                    }
                    </li>`
                    )}
            </ul>
        </div>
        <div class="footer">
            <textarea
                id="textValue"
                $key="textValueDom"
                placeholder="说点什么..."
                autofocus
                onChange=${onTextValue}
            ></textarea>
            <div class="send-box">
                <p class="send active" onClick=${send}>发送</p>
            </div>
        </div>
    </div>
    `;
}

// 用户名
function useName(name) {
	const username = name.toString();
	return username.substring(name.length - 5, name.length);
}

// 随机获取头像背景
function randomRgb() {
	let R = Math.floor(Math.random() * 130 + 110);
	let G = Math.floor(Math.random() * 130 + 110);
	let B = Math.floor(Math.random() * 130 + 110);
	return 'rgb(' + R + ',' + G + ',' + B + ')';
}

// WebSocket初始化
function init() {
	if (typeof WebSocket === 'undefined') {
		alert('您的浏览器不支持socket');
	} else {
		socket = new WebSocket(path);
		socket.onopen = open;
		socket.onerror = error;
		socket.onclose = closed;
		socket.onmessage = getMessage;
	}
}

function open() {
	alert('服务连接成功');
}

function error() {
	alert('连接错误');
}

function closed() {
	alert('服务关闭');
}

// 监听信息
function getMessage(msg) {
    const obj = JSON.parse(msg.data);
    setData(() => {
        data.chatArr.push(obj);
    }).then(() => {
        data.chatbox.scrollTop = data.chatbox.scrollHeight;
    });
}

// 输入内容
function onTextValue(v) {
	data.textValue = v.target.value;
    data.textValueDom.value = '';
}

// 发送消息
function send() {
	if (data.textValue.trim().length > 0) {
		const obj = {
			name: name,
			txt: data.textValue,
			bg: bg,
		};
		socket.send(JSON.stringify(obj));
		data.textValue = '';
		data.textValueDom.focus();
	}
}


init();

onMounted(()=>{
    data.textValueDom = domInfo.textValueDom;
    data.chatbox = domInfo.chatBox;
})

export default App;
