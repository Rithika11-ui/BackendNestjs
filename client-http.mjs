 
import fetch from "node-fetch";
import "dotenv/config";

const HASURA_HTTP = process.env.HASURA_HTTP;
const ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

async function gql(query, variables = {}) {
    const res = await fetch(HASURA_HTTP, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": ADMIN_SECRET
        },
        body: JSON.stringify({ query, variables })
    });

    const json = await res.json();
    if (json.errors) {
        console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
        process.exit(1);
    }
    return json.data;
}

async function main() {
    const qUsers = `
    query {
      users(order_by: {created_at: asc}) {
        id
        name
        email
      }
    }
  `;
    const usersData = await gql(qUsers);
    console.log("Users:", usersData.users);

    const alice = usersData.users.find(u => u.email === "alice@example.com");
    if (!alice) throw new Error("Alice not found. Did you run seed SQL?");

    const mAddPost = `
    mutation AddPost($userId: uuid!, $title: String!, $body: String!) {
      insert_posts_one(object: {user_id: $userId, title: $title, body: $body}) {
        id
        title
        created_at
      }
    }
  `;
    const newPost = await gql(mAddPost, {
        userId: alice.id,
        title: "Post from Node client",
        body: "This was created via Hasura GraphQL mutation."
    });
    console.log("Inserted Post:", newPost.insert_posts_one);

    const qPosts = `
    query {
      posts(order_by: {created_at: desc}, limit: 5) {
        id
        title
        created_at
        user { name }
      }
    }
  `;
    const postsData = await gql(qPosts);
    console.log("Latest Posts:", postsData.posts);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
