const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = (input) => {
  result.innerText = "Call Stack Animation";
  const animationData = []; 
 
  const generateAnimationData = (inputVal) => {
    if (inputVal === 0) return; 
    const remainder = inputVal % 2;
    animationData.push({
      inputVal: inputVal,
      addElDelay: (animationData.length * 2000), 
      msg: `decimalToBinary(${inputVal}) returns "${decimalToBinary(Math.floor(inputVal / 2))}" + ${remainder} (${inputVal} % 2). Then it pops off the stack.`,
      showMsgDelay:  (animationData.length * 3000),
      removeElDelay:  (animationData.length * 5000),
    });
    generateAnimationData(Math.floor(inputVal / 2)); 
  };

  generateAnimationData(input);

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  showAnimation(inputInt); 
  result.textContent = decimalToBinary(inputInt); 
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});

