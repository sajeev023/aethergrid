async function testRoutes() {
  const base = "http://localhost:3000";

  console.log("1. Testing Public Routes:");
  for (const path of ["/", "/login", "/signup", "/admin/access-denied"]) {
    const res = await fetch(`${base}${path}`);
    console.log(`  ${path}: ${res.status} ${res.statusText}`);
  }

  console.log("\n2. Testing Protected Routes (Unauthenticated -> should redirect to /login):");
  for (const path of ["/dashboard", "/giver", "/mobile-simulator", "/giver/setup"]) {
    const res = await fetch(`${base}${path}`, { redirect: "manual" });
    console.log(`  ${path}: ${res.status} Location: ${res.headers.get("location")}`);
  }

  console.log("\n3. Authenticating as Taker (taker@aethergrid.io):");
  let loginRes = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "taker@aethergrid.io", password: "AetherPass123!" }),
  });

  if (!loginRes.ok) {
    await fetch(`${base}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Aarav Cloud User",
        email: "taker@aethergrid.io",
        password: "AetherPass123!",
        role: "TAKER",
      }),
    });
    loginRes = await fetch(`${base}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "taker@aethergrid.io", password: "AetherPass123!" }),
    });
  }
  console.log(`  Login status: ${loginRes.status}`);
  const setCookie = loginRes.headers.get("set-cookie");
  const cookie = setCookie ? setCookie.split(";")[0] : "";
  console.log(`  Session cookie established: ${cookie ? "YES" : "NO"}`);

  console.log("\n4. Testing Protected Routes (Authenticated):");
  for (const path of ["/dashboard", "/giver", "/mobile-simulator", "/giver/setup"]) {
    const res = await fetch(`${base}${path}`, {
      headers: { cookie },
      redirect: "manual",
    });
    console.log(`  ${path}: ${res.status} ${res.statusText}`);
  }
}

testRoutes().catch(console.error);
