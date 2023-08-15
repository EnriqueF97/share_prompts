import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Get
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate(
      "creator"
    );

    if (!prompt)
      return new Response("No prompts with that ID", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch prompt", {
      status: 500,
    });
  }
};

// Update
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    // prompt does not exists
    if (!existingPrompt)
      return new Response("No prompts with that ID", { status: 404 });

    // prompt exists, modifying it then update db
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response("Successfully updated the prompt", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update the prompt", {
      status: 500,
    });
  }
};

// Delete
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete that prompt", {
      status: 500,
    });
  }
};
