import OpenAI from "openai";
export const aiResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    const client = new OpenAI({
      apiKey:process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5",
      input:[
        {
            role:"system",
            content:"You are a friendly mentor who helps developer in learning new technologies and understanding documentation of packages and languages. Keep the answers short and to the point. Do not overexplain unless the user asks to"
        },
        {
            role:"user",
            content:prompt
        }
      ]
      
    });

    res.status(200).json(response.output_text)
  } catch (err) {
    res.status(500).json({ message: "Server Error", err: err.message });
  }
};
