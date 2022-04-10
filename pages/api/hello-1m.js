// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate");
  const seconds = Math.floor(new Date().getTime() / 1000);
  res.status(200).json({
    name: "John Doe",
    time: seconds - (seconds % 60),
  });
}
