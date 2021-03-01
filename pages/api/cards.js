function cards(req, res) {
  const cards = {
    globalBest: 20,
    items: [
      { id: 1, number: 1, open: false, matched: false, unmatched: false, disabled: false },
      { id: 2, number: 1, open: false, matched: false, unmatched: false, disabled: false },
      { id: 3, number: 2, open: false, matched: false, unmatched: false, disabled: false },
      { id: 4, number: 2, open: false, matched: false, unmatched: false, disabled: false },
      { id: 5, number: 3, open: false, matched: false, unmatched: false, disabled: false },
      { id: 6, number: 3, open: false, matched: false, unmatched: false, disabled: false },
      { id: 7, number: 4, open: false, matched: false, unmatched: false, disabled: false },
      { id: 8, number: 4, open: false, matched: false, unmatched: false, disabled: false },
      { id: 9, number: 5, open: false, matched: false, unmatched: false, disabled: false },
      { id: 10, number: 5, open: false, matched: false, unmatched: false, disabled: false },
      { id: 11, number: 6, open: false, matched: false, unmatched: false, disabled: false },
      { id: 12, number: 6, open: false, matched: false, unmatched: false, disabled: false },
    ]
  };

  res.status(200).json(cards);
}

export default cards;
