function checkCashRegister(price, cash, cid) {
  if (
    cash - price ===
    cid.reduce((sum, denom) => Math.round(sum + denom[1] * 100), 0) / 100
  )
    return { status: "CLOSED", change: cid };
  if (
    cash - price >
    cid.reduce((sum, denom) => Math.round(sum + denom[1] * 100), 0) / 100
  )
    return { status: "INSUFFICIENT_FUNDS", change: [] };

  const cashOnHand = cid.map((el) => Math.round(el[1] * 100));
  console.log(cashOnHand);
  let changeDue = Math.round(cash * 100) - Math.round(price * 100);
  const cashBack = {
    PENNY: 0,
    NICKEL: 0,
    DIME: 0,
    QUARTER: 0,
    ONE: 0,
    FIVE: 0,
    TEN: 0,
    TWENTY: 0,
    "ONE HUNDRED": 0,
  };

  while (changeDue >= 10000 && cashOnHand[8] >= 10000) {
    changeDue -= 10000;
    cashOnHand[8] -= 10000;
    cashBack["ONE HUNDRED"] += 10000;
  }

  while (changeDue >= 2000 && cashOnHand[7] >= 2000) {
    changeDue -= 2000;
    cashOnHand[7] -= 2000;
    cashBack["TWENTY"] += 2000;
  }

  while (changeDue >= 1000 && cashOnHand[6] >= 1000) {
    changeDue -= 1000;
    cashOnHand[6] -= 1000;
    cashBack["TEN"] += 1000;
  }

  while (changeDue >= 500 && cashOnHand[5] >= 500) {
    changeDue -= 500;
    cashOnHand[5] -= 500;
    cashBack["FIVE"] += 500;
  }

  while (changeDue >= 100 && cashOnHand[4] >= 100) {
    changeDue -= 100;
    cashOnHand[4] -= 100;
    cashBack["ONE"] += 100;
  }

  while (changeDue >= 25 && cashOnHand[3] >= 25) {
    changeDue -= 25;
    cashOnHand[3] -= 25;
    cashBack["QUARTER"] += 25;
  }

  while (changeDue >= 10 && cashOnHand[2] >= 10) {
    changeDue -= 10;
    cashOnHand[2] -= 10;
    cashBack["DIME"] += 10;
  }

  while (changeDue >= 5 && cashOnHand[1] >= 5) {
    changeDue -= 5;
    cashOnHand[1] -= 5;
    cashBack["NICKEL"] += 5;
  }

  while (changeDue >= 1 && cashOnHand[0] >= 1) {
    changeDue -= 1;
    cashOnHand[0] -= 1;
    cashBack["PENNY"] += 1;
  }

  if (changeDue) return { status: "INSUFFICIENT_FUNDS", change: [] };
  return {
    status: "OPEN",
    change: Object.entries(cashBack)
      .filter((el) => el[1])
      .map((el) => [el[0], el[1] / 100])
      .reverse(),
  };
}
