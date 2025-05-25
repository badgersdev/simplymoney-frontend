export async function logoutOnServer() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    });

    return response.ok;
  } catch (error) {
    console.error("Błąd podczas wylogowywania:", error);
    return false;
  }
}
