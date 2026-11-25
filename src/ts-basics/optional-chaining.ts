type Customer = {
  name: string;
  email?: string;
};

function checkCustomer(customer: Customer): boolean {
  if (customer.email) {
    return true;
  } else {
    return false;
  }
}

let firstCustomer: Customer = {
  name: "Sam",
};

let secondCustomer: Customer = {
  name: "Lina",
  email: "lina@example.com",
};

console.log("First customer email:", firstCustomer.email?.toLowerCase());
console.log("First customer valid:", checkCustomer(firstCustomer));
console.log("Second customer valid:", checkCustomer(secondCustomer));