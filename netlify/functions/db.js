import { neon } from "@netlify/neon";

const sql = neon();

export async function handler() {
  try {
    // simple test query
    const result = await sql`SELECT 'Neon connected successfully' AS message`;

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
