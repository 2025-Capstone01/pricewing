const AI_SERVER_URL = process.env.REACT_APP_AI_SERVER_URL;

export async function sendToAI(inputData) {
  try {
    const response = await fetch(`${AI_SERVER_URL}/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),  // send full object, not wrapped in "input"
    });

    if (!response.ok) {
      throw new Error(`AI server error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error communicating with AI server:', error);
    throw error;
  }
}

