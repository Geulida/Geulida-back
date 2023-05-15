const imgController = {
  async createImg(res, req) {
    const { color, style, summary } = req.body;
    const prompt = `${color}, ${style}, ${summary}`;
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    console.log(response.data);
    if (response.data) {
      res.json({
        imgUrl: response.data.data[0].url,
      });
    }
  },
};

export default imgController;
