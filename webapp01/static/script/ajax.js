class AjaxClient {

  /**
   * GETリクエスト
   * @param {String} url URL
   * @param {String} params パラメータ
   * @returns 
   */
  async get(url, params) {
    const query = new URLSearchParams(params ?? {});
    
    const headers = new Headers();
    headers.append("X-Requested-With", "XMLHttpRequest");
    const resp = await fetch(`${url}?${query.toString()}`, {
      method: "GET",
      headers,
    });

    try {
      return await resp.json();
    } catch (err) {
      return null;
    }
  }

  /**
   * POSTリクエスト
   * @param {String} url URL
   * @param {String} params パラメータ
   * @returns 
   */
  async post(url, params) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");

    const resp = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers,
    });

    try {
      return await resp.json();
    } catch (err) {
      return null;
    }
  }
  

  /**
   * POSTリクエストを送信し、ストリームで受け取る
   * @param {String} url URL
   * @param {String} params パラメータ
   * @returns 
   */
  async postReceiveStream(url, params) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");
    headers.append("accept", "text/event-stream");

    const resp = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers,
    });

    // とりあえずそのまま返す。
    return resp;
  }
}

const ajax = new AjaxClient();

function useAjax() {
  return ajax;
}

export { AjaxClient, useAjax };
