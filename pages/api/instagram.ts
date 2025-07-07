import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username = "instagram" } = req.query;

  const response = await fetch(
    `https://api.apify.com/v2/acts/apify~instagram-post-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: [username],
        resultsLimit: 9
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return res.status(500).json({ error });
  }

  const data = await response.json();
  const links = data.map((item: any) => item.url).slice(3);
  res.status(200).json({ links });
}
