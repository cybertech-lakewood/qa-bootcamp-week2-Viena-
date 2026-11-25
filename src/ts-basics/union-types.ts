function showCode(code: number | string): void {
  if (typeof code === "number") {
    console.log("Number code:", code);
  } else {
    console.log("Text code:", code.toUpperCase());
  }
}

showCode(100);
showCode("abc");