console.log("Hi JS");
// get and set element by ID
function getElement(elementId) {
  const element = document.getElementById(elementId);
  const elementValue = element.innerText;
  return elementValue;
}
function setElement(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}

// remove class
function removeAttribute(elementId) {
  const element = document.getElementById(elementId);
  element.removeAttribute("disabled");
}

// update seat element
function updateSeatLeft() {
  const setLeft = getElement("seats-left");
  const newSeatLeft = setLeft - 1;
  setElement("seats-left", newSeatLeft);
}
// checkout new seats
function checkoutSeats(seatNo) {
  const allCheckoutSeats = document.getElementById("checkout-seats-table");
  const newSeats = document.createElement("tr");
  newSeats.innerHTML = `
         <td >${seatNo}</td>
         <td >Bussiness</td>
         <td >550</td>
    `;
  allCheckoutSeats.appendChild(newSeats);
}

// booking seats

function seatBooking(event) {
  const seats = document.getElementsByClassName("btn-seat");
  const seatsArray = Array.from(seats);

  const seat = event.target;
  const seatNumber = seat.innerText;

  if (seatsArray.includes(seat)) {
    // console.log("got it");
    if (totalSeats.includes(seatNumber) === false && totalSeats.length < 4) {
      totalSeats.push(seatNumber);
      seat.classList.add("bg-green-500", "text-white");
      updateSeatLeft();

      const bookingSeats = totalSeats.length;

      //   console.log(seatNumber, totalSeats.length);
      const ans = document.getElementById("checkout-seats");
      // console.log(ans);
      setElement("checkout-seats", bookingSeats);
      checkoutSeats(seatNumber);
      if (bookingSeats === 4) {
        removeAttribute("apply-btn");
      }
      //   console.log(bookingSeats*550);
      const totalCost = bookingSeats * 550;
      setElement("total-price", totalCost);
    } else {
      console.log("already added");
    }
  } else {
    console.log("not found");
  }

  //   console.log(totalSeats, seatNumber);
}

// use coupon (call in apply btn)
function useCoupon() {
  const couponElement = document.getElementById("ticket-coupon");
  const totalPrice = getElement("total-price");
  const coupon = couponElement.value;

  if (coupon === "NEW15" || coupon === "Couple20") {
    let offer;
    if (coupon === "NEW15") {
      couponElement.value = "";
      offer = totalPrice * 0.15;
    } else if (coupon === "Couple20") {
      couponElement.value = "";
      offer = totalPrice * 0.2;
    }
    console.log(coupon);
    const grandTotal = totalPrice - offer;
    setElement("grand-total", grandTotal);
  }
}

// go to next page

// booking seats
const totalSeats = [];

document.getElementById("seat-numbers").addEventListener("click", seatBooking);

// next button
document.getElementById("phone-number").addEventListener("keyup", function (e) {
  const phoneNumber = e.target.value;
  const seatsNumber = totalSeats.length;
  if (phoneNumber.length > 0 && seatsNumber > 0) {
    console.log(phoneNumber);
    console.log(totalSeats.length);
    removeAttribute("btn-next");
  }
});

function showDisplay(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove("hidden");
}

function hideDisplay(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add("hidden");
}

function nextPage() {
  hideDisplay("web-site");
  showDisplay("success-card");
}
function continuePage() {
  hideDisplay("success-card");
  showDisplay("web-site");
}
