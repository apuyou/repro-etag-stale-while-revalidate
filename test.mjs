import fetch from "node-fetch";

const request = async (currentEtag) => {
  const response = await fetch(
    "https://repro-etag-stale-while-revalidate.vercel.app/api/hello-1m",
    {
      headers: currentEtag
        ? {
            "if-none-match": currentEtag,
          }
        : undefined,
    }
  );
  let time;
  try {
    const result = await response.json();
    time = result.time;
  } catch {}
  const etag = response.headers.get("etag");
  console.log(
    `Result status=${
      response.status
    } if-none-match=${currentEtag} etag=${etag}  x-vercel-cache=${response.headers.get(
      "x-vercel-cache"
    )} time=${time}`
  );

  setTimeout(() => {
    request(etag || currentEtag);
  }, 1000);
};

const main = async () => {
  request();
};

main();
