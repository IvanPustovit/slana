export default async function getStart(
  url,
  method = "POST",
  body = null,
  headers = {}
) {
  try {
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
