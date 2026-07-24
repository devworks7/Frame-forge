async function test() {
  const token = 'fake-token-bypass-for-test';
  
  try {
    const signRes = await fetch("http://localhost:3000/api/cloudinary-sign", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    const signData = await signRes.json();
    console.log("Sign Data:", signData);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
