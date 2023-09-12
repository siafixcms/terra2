const encoder = new TextEncoder();
const decoder = new TextDecoder();

let secret = "terra_balance_seterra_balance_se";

export async function encryptData(data) {
  const encodedData = encoder.encode(data);
  const key = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "AES-CBC", length: 256 },
      false,
      ["encrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const encryptedContent = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: iv },
      key,
      encodedData
  );
  const encryptedArray = new Uint8Array(encryptedContent);
  const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
  const ivHex = Array.from(iv).map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return { encryptedData: encryptedBase64, iv: ivHex };
}

export async function decryptData(encryptedPayload) {
  const [encryptedData, ivHex] = encryptedPayload.split('|_|_|');
  const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const key = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "AES-CBC", length: 256 },
      false,
      ["decrypt"]
  );
  const decryptedContent = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: iv },
      key,
      new Uint8Array(atob(encryptedData).split("").map(char => char.charCodeAt(0)))
  );
  return decoder.decode(decryptedContent);
}

export async function apiCall(url, data) {
  const payload = JSON.stringify(data);
  const { encryptedData, iv } = await encryptData(payload);
  const response = await fetch('/api' + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: encryptedData + '|_|_|' + iv
  });
  const encryptedPayload = await response.text();
  const decryptedResponse = await decryptData(encryptedPayload);
  let jsonResponse;
  try {
      jsonResponse = JSON.parse(decryptedResponse);
  } catch (error) {
      console.error("Error parsing JSON:", error);
  }
  if( jsonResponse.notification ) {
    notify(jsonResponse.notification);
  }
  return jsonResponse;
}
