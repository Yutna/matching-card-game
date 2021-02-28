class CardsAdapter {
  static async get() {
    try {
      const response = await fetch('/api/cards');
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}

export default CardsAdapter;
