import fetch from "node-fetch";

const request = async (currentEtag) => {
  const response = await fetch(
    "https://repro-etag-stale-while-revalidate.vercel.app/api/hello",
    {
      headers: currentEtag
        ? {
            "if-none-match": currentEtag,
          }
        : undefined,
    }
  );
  // const result = await response.json();
  const etag = response.headers.get("etag");
  console.log(
    `Result status=${
      response.status
    } if-none-match=${currentEtag} etag=${etag}  x-vercel-cache=${response.headers.get(
      "x-vercel-cache"
    )}`
  );

  setTimeout(() => {
    request(etag || currentEtag);
  }, 1000);
};

const main = async () => {
  request();
};

main();
