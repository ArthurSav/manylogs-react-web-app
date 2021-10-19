/**
 * Parses either an http request or response and converts it to displayable data
 * @param {*} data Either Request or Response
 * @returns formatted headers/body
 */
export const parseHttpDataToDisplayableContent = (data) => {
  const headers = data.headers;
  const body = data.body;
  const bodyType = typeof body;

  const result = {
    contentType: "",
    headersText: "",
    headerHighlightLang: "yaml",
    bodyHighlightLang: "",
    bodyText: body || "",
    bodySize: 0, // bytes
    isBodySizeLarge: false,
  };

  if (headers) {
    for (const key in headers) {
      if (key.toLowerCase() === "content-type") {
        result.contentType = headers[key];
      }
      const line = `${key}: ${headers[key]}\n`;
      result.headersText += line;
    }
  }

  const isJson = isContentTypeJson(result.contentType);

  if (body) {
    result.bodySize = new TextEncoder().encode(body).length;
    result.isBodySizeLarge = result.bodySize >= 2000000;
  }

  // prettify string if Json format
  if (isJson && bodyType === "string") {
    try {
      result.bodyText = JSON.stringify(JSON.parse(body), null, 2);
    } catch (e) {
      console.log("Unable to parse body as json: ", e);
    }
  }

  // highlight language
  if (result.bodySize >= 500000) {
    // large bodies cause performance issues.
    result.bodyHighlightLang = "text";
  } else if (isJson) {
    result.bodyHighlightLang = "json";
  } else {
    result.bodyHighlightLang = "htmlbars";
  }

  return result;
};

export const isContentTypeJson = (contentType) =>
  contentType?.toLowerCase().includes("application/json");
export const isContentTypeHtml = (contentType) =>
  contentType?.toLowerCase().includes("html");
