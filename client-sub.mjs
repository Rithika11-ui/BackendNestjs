 
import "dotenv/config";
import WebSocket from "ws";
import { createClient } from "graphql-ws";

const HASURA_WS = process.env.HASURA_WS;
const ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

const client = createClient({
    url: HASURA_WS,
    webSocketImpl: WebSocket,
    connectionParams: {
        headers: {
            "x-hasura-admin-secret": ADMIN_SECRET
        }
    }
});

const query = `
  subscription LivePosts {
    posts(order_by: {created_at: desc}, limit: 10) {
      id
      title
      created_at
      user { name }
    }
  }
`;

console.log("Listening for realtime posts... (CTRL+C to stop)");

client.subscribe(
    { query },
    {
        next: (data) => {
            console.log("Update:", JSON.stringify(data.data.posts[0], null, 2));
        },
        error: (err) => console.error("Subscription error:", err),
        complete: () => console.log("Subscription complete")
    }
);