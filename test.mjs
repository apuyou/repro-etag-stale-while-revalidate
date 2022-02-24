import fetch from "node-fetch";

const request = async (currentEtag) => {
  const response = await fetch("http://localhost:3000/api/hello", {
    headers: currentEtag
      ? {
          "if-none-match": currentEtag,
        }
      : undefined,
  });
  const result = await response.json();
  const etag = response.headers.get("etag");
  console.log(
    `Result status=${
      response.status
    } if-none-match=${currentEtag} etag=${etag} match=${
      currentEtag === etag
    } time=${result.time}`
  );

  setTimeout(() => {
    request(etag);
  }, 1000);
};

const main = async () => {
  request();
};

main();
