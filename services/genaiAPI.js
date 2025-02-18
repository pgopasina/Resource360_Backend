const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config.json");

async function aiSummarizingStatus(hourlyStatus) {
  try {
    const genAI = new GoogleGenerativeAI(config.genAi_apiKey);
    let model;

    // Check if hourlyStatus is valid and non-empty
    if (!hourlyStatus || Object.keys(hourlyStatus).length === 0) {
      return "No hourly status updates provided. Unable to generate a summary.";
    }

    const prompt = `
You are a professional assistant skilled in summarizing daily activities into concise and cohesive paragraphs.
Using the provided hourly status updates, write a professional daily summary paragraph with a length between 300 and 500 characters. Avoid mentioning specific time slots and focus on presenting the activities smoothly and logically in a professional tone.

If the hourly status is empty or does not provide meaningful information, simply state: "No specific updates available in hourly status for today, So Unable to generate a summary."

Hourly status:
${JSON.stringify(hourlyStatus)}

Please provide a well-written summary or respond with the specified message if no updates are available.

Daily Summary:
`;

    try {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (modelError) {
      console.error("Error fetching the generative model:", modelError.message);
      return;
    }

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (generateError) {
      console.error("Error generating content:", generateError.message);
    }
  } catch (generalError) {
    console.error("Unexpected error occurred:", generalError.message);
  }
}

module.exports = aiSummarizingStatus;
