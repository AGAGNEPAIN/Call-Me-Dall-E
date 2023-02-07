// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";

import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generateImageHandler(
  req: NextApiRequest,
  res: NextApiResponse<ImagesResponseDataInner[]>
) {
  const { prompt, number } = req.body;
  
  try {
    const response = await openai.createImage({
      prompt,
      n: number,
      size: "512x512",
    });
    
    res.status(200).json(response.data.data);
  } catch (err) {
    console.log(err);

    res.status(500);
  }
}
