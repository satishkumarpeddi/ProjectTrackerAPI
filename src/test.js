const test = require("node:test");
const assert = require("node:assert/strict");

const BASE_URL = "http://localhost:3000";

let projectId;

// Helper to parse JSON responses
async function getJSON(response) {
    return response.json();
}

test("Project Tracker CRUD API", async (t) => {
    await t.test("GET /projects returns an array", async () => {
        const res = await fetch(`${BASE_URL}/projects`);
        const data = await getJSON(res);

        assert.equal(res.status, 200);
        assert.ok(Array.isArray(data));
    });

    await t.test("POST /projects creates a project", async () => {
        const res = await fetch(`${BASE_URL}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Test Project",
                description: "Testing CRUD operations",
                status: "planned"
            })
        });

        const data = await getJSON(res);

        // Update this to 201 if your POST route returns 201.
        assert.ok([200, 201].includes(res.status));
        assert.equal(data.title, "Test Project");
        assert.equal(data.description, "Testing CRUD operations");
        assert.equal(data.status, "planned");
        assert.ok(data.id !== undefined && data.id !== null);

        projectId = data.id;
    });

    await t.test("GET /projects/:id returns the created project", async () => {
        assert.ok(projectId !== undefined, "Create a project first");

        const res = await fetch(`${BASE_URL}/projects/${projectId}`);
        const data = await getJSON(res);

        assert.equal(res.status, 200);
        assert.equal(data.id, projectId);
        assert.equal(data.title, "Test Project");
    });

    await t.test("PUT /projects/:id updates the project", async () => {
        const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Updated Project",
                description: "Updated description",
                status: "in-progress"
            })
        });

        const data = await getJSON(res);

        assert.equal(res.status, 200);
        assert.equal(data.title, "Updated Project");
        assert.equal(data.description, "Updated description");
        assert.equal(data.status, "in-progress");
    });

    await t.test("DELETE /projects/:id deletes the project", async () => {
        const res = await fetch(`${BASE_URL}/projects/${projectId}`);

        assert.equal(res.status, 200);

        const deleteRes = await fetch(
            `${BASE_URL}/projects/${projectId}`,
            { method: "DELETE" }
        );

        assert.ok([200, 204].includes(deleteRes.status));
    });

    await t.test("GET deleted project returns 404", async () => {
        const res = await fetch(`${BASE_URL}/projects/${projectId}`);

        assert.equal(res.status, 404);
    });

    await t.test("GET nonexistent project returns 404", async () => {
        const res = await fetch(`${BASE_URL}/projects/999999999`);

        assert.equal(res.status, 404);
    });
});
