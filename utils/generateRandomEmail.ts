function generateRandomEmail(): string {
    const randomString = Math.random().toString(36).substring(2, 8); // Genera una cadena corta aleatoria
    return `user${randomString}@example.com`;
}

export default generateRandomEmail;
