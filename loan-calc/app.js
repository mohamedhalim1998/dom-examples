const loan = document.querySelector("#loan");
const interest = document.querySelector("#interest");
const year = document.querySelector("#year");
const loading = document.querySelector("#loading");
const result = document.querySelector("#result");
const calculate = document.querySelector("#calculate");
const monthlyPayment = document.getElementById("monthly-payment");
const totalPayment = document.getElementById("total-payment");
const totalInterest = document.getElementById("total-interest");

loading.style.display = "none";
result.style.display = "none";
document.querySelector(".alert").style.display = "none";

calculate.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  loading.style.display = "block";
  setTimeout(calculateRes, 2000);
});
function calculateRes() {
  loading.style.display = "none";
  result.style.display = "block";
  document.querySelector(".alert").style.display = "none";

  const principal = parseFloat(loan.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(year.value) * 12;
  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please check your numbers");
  }
}
function showError(error) {
  loading.style.display = "none";
  result.style.display = "none";
  document.querySelector(".alert").textContent = error;
  document.querySelector(".alert").style.display = "block";
}
