const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config.json");

async function aiSummarizingStatus(hourlyStatus) {
  try {
    const genAI = new GoogleGenerativeAI(config.genAi_apiKey);
    let model;
    //     hourlyStatus = {
    //       "2pm_4pm": "Working on API",
    //       "4pm_6pm": "had Meeting Vinod",
    //       "6pm_8pm": "worked on API Documentation",
    //       "8pm_10pm": "App Review meeting with team",
    //       "10pm_11pm": "sprint Planning",
    //     };
    // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh",hourlyStatus);

    const prompt = `
You are a professional assistant skilled in summarizing daily activities into concise and cohesive paragraphs.
Using the provided hourly status updates, write a professional daily summary paragraph with a length between 300 and 500 characters. Avoid mentioning specific time slots and focus on presenting the activities smoothly and logically in a professional tone.

Hourly status:
${JSON.stringify(hourlyStatus)}

Please provide a well-written summary within the specified character limit.

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
      // if (hourlyStatus.length != 0) {
      // console.log(result.response.text());
      return result.response.text();
      // }
    } catch (generateError) {
      console.error("Error generating content:", generateError.message);
    }
  } catch (generalError) {
    console.error("Unexpected error occurred:", generalError.message);
  }
}
aiSummarizingStatus();

module.exports = aiSummarizingStatus;
