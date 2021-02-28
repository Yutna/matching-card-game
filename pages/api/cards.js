function cards(req, res) {
  const cards = {
    globalBest: 20,
    items: [
      { id: 1, number: 1 },
      { id: 2, number: 1 },
      { id: 3, number: 2 },
      { id: 4, number: 2 },
      { id: 5, number: 3 },
      { id: 6, number: 3 },
      { id: 7, number: 4 },
      { id: 8, number: 4 },
      { id: 9, number: 5 },
      { id: 10, number: 5 },
      { id: 11, number: 6 },
      { id: 12, number: 6 },
    ]
  };

  res.status(200).json(cards);
}

export default cards;
