import { useAjax } from "../../script/ajax.js";
const ajax = useAjax();

// -------------------
const questionElem = document.getElementById("question");
const executeQuestionElem = document.getElementById("executeQuestion");
const responseAreaElem = document.getElementById("responseArea");

// -------------------

/**
 * レスポンスエリアのクリア
 */
function clearResponseArea() {
  while (responseAreaElem.firstChild) {
    responseAreaElem.removeChild(responseAreaElem.firstChild);
  }
}

/**
 * レスポンスエリアにメッセージ追加
 *
 * @param {String} message
 */
function appendResponseArea(message) {
  const div = document.createElement("div");
  div.textContent = message;

  responseAreaElem.append(div);
}

// -------------------
// handling
executeQuestionElem.addEventListener("click", async () => {
  clearResponseArea();

  const param = {
    "input_message": questionElem.value
  };
  const resp = await ajax.postReceiveStream("/sandbox01/question", param);

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const r = await reader.read();
    if (r.done) {
      break;
    }

    const decoded = decoder.decode(r.value);
    appendResponseArea(decoded);
  }
});
