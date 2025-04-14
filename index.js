// 0->one 1->two 2->three 3->four
  
  terminalMap = {
    0: "one",
    1: "two",
    2: "three",
    3: "four",
    resistor: "resistor",
    4: "five",
    5: "six",
    6: "seven",
    7: "eight",
    8: "nine",
    9: "ten",
    10: "eleven",
    11: "twelve",
    12: "thirteen",
    13: "fourteen",
    14: "fifteen",
    15: "sixteen",
    16: "seventeen",
    17: "eighteen",
    18: "nineteen",
    19: "twenty",
    20: "twentyone",
    21: "twentytwo",
    22: "twentythree",
    23  : "twentyfour",
    24: "twentyfive",
    25: "twentysix",
    26: "twentyseven",
  };

  
  setTimeout(() => {
    rangeSelector();
  }, 100);




  function checkcolor() {

    if(document.querySelector(".kit")){
    let lastColor = null;
    newColor = setInterval(() => {
      let currentColor = sessionStorage.getItem("selectedColor");
      if (currentColor !== lastColor) {
        console.log("new color", currentColor);
        lastColor = currentColor;

        // Hide all wires first
        const wiresToHandle = ["wire5", "wire6", "wire7", "wire8"];
        wiresToHandle.forEach(wireId => {
          const wire = document.getElementById(wireId);
          if (wire) wire.style.display = "none";
        });

        // Show wire based on color
        switch (currentColor) {
          case "Red":
            document.getElementById("wire5").style.display = "block";
            break;
          case "Yellow":
            document.getElementById("wire6").style.display = "block";
            break;
          case "Green":
            document.getElementById("wire7").style.display = "block";
            break;
          case "Blue":
            document.getElementById("wire8").style.display = "block";
            break;
        }
      }
    
    }, 500);
  }
}


  function rangeSelector() {
    newIndexinterval = setInterval(() => {
      let newIndex = sessionStorage.getItem("newIndex");
      let selectedColor = sessionStorage.getItem("selectedColor");
      
      // Convert newIndex from 0-4 range to array index 0-20
      newIndex = Math.floor(newIndex * 5); 
      
      if (newIndex < 0 || newIndex > 20) {
        console.warn("Invalid newIndex value:", newIndex);
        return; 
      }

      let volttext = document.getElementById("volt");
      let currtext = document.getElementById("curr");

      // Return early if elements are not found
      if (!volttext || !currtext) {
        console.warn("Voltage or current display elements not found");
        return;
      }

      const colorReadings = {
        Red: {
          voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
          ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
        },
        Yellow: {
          voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
          ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
        },
        Green: {
          voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
          ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
        },
        Blue: {
          voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
          ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
        },
      };

      const glowThresholds = {
        Red: 1.4,
        Yellow: 1.8, 
        Green: 2.0,
        Blue: 2.4
      };

      if (selectedColor && colorReadings[selectedColor]) {
        const readings = colorReadings[selectedColor];
        volttext.textContent = readings.voltmeter[newIndex].toFixed(1);
        
        const curr = readings.ammeter[newIndex];
        currtext.textContent = curr.toFixed(2);

        // Check if current exceeds threshold
        // Turn off all LEDs first
        const ledColors = ['red', 'yellow', 'green', 'blue'];
        ledColors.forEach(color => {
        document.getElementById(`${color}led`).style.display = "none";
        });

        // Track if threshold is reached
        if (curr >= glowThresholds[selectedColor]) {
            console.log(`${selectedColor} has reached its threshold current of ${glowThresholds[selectedColor]}`);
            document.getElementById(`${selectedColor.toLowerCase()}led`).style.display = "block";
            sessionStorage.setItem("thresholdReached", true);
        }else{
            sessionStorage.setItem("thresholdReached", false);
        }
        
        sessionStorage.setItem("current", curr.toFixed(2));
        sessionStorage.setItem("voltage", readings.voltmeter[newIndex].toFixed(1));
      }
    }, 500);
  }



  
  document.addEventListener("DOMContentLoaded", () => {
    // Show warning alert when page loads
    // Swal.fire({
    //     title: 'Important Instructions',
    //     html: `
    //         <div style="text-align: left">
    //         <p>🔌 Please complete the circuit connections before starting the experiment:</p>
    //         <ul>
    //             <li>Connect all terminals in the correct sequence</li>
    //             <li>Press the power button</li>
    //             <li>Insert the key to activate the circuit</li>
    //         </ul>
    //         <p>⚡ The controls will be enabled once the circuit is complete.</p>
    //         </div>
    //     `,
    //     icon: 'warning',
    //     confirmButtonText: 'Got it!',
    //     confirmButtonColor: '#3085d6',
    //     allowOutsideClick: false
    // });

    const dropdownButton = document.getElementById("dropdownMenuButton");
    const slider = document.getElementById("range");
    const svgObject = document.getElementById("main-svg");
    const bulbColorElement = document.getElementById('bulbcolor');
    // const fillTable = document.getElementById('fill-table');
    const showGraph = document.getElementById('showGraph');
    const downloadPDF = document.getElementById('downloadPdf');
    
    let currentColor = "Red"; 
    
let circuitComplete = false; // Add circuit state tracking
const updateControlStates = () => {
        slider.disabled = !circuitComplete;
        dropdownButton.disabled = !circuitComplete;
        if (sessionStorage.getItem("circuitComplete") === "false") {
            slider.value = 0;
            dropdownButton.classList.add('disabled');
            // fillTable.classList.add('disabled');
            showGraph.classList.add('disabled');
            downloadPDF.classList.add('disabled');
        } else {
            dropdownButton.classList.remove('disabled');
            // fillTable.classList.remove('disabled');
            showGraph.classList.remove('disabled');
            downloadPDF.classList.remove('disabled');
        }
    };
// updateControlStates();

function checkCircuitCompletion() {
  // Your existing circuit check logic
  circuitComplete = sessionStorage.getItem("circuitComplete") === "true";
  // updateControlStates();
}
circuitComplete = sessionStorage.getItem("circuitComplete") === "true";
    // updateControlStates();

    // Listen for storage changes
    window.addEventListener('storage', (e) => {
        if (e.key === "circuitComplete") {
            circuitComplete = e.newValue === "true";
            // updateControlStates();
        }
    });

    // Also check directly when sessionStorage changes
    const originalSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === "circuitComplete") {
            circuitComplete = value === "true";
            // updateControlStates();
        }
    };

    // Add storage event listener for color changes
    // window.addEventListener('storage', (e) => {
    //     if (e.key === "setColor") {
    //         console.log('Color changed to:', e.newValue);
    //     }
    // });

    // Monitor direct sessionStorage changes
    // const originalSetItemColor = sessionStorage.setItem;
    // sessionStorage.setItem = function(key, value) {
    //     originalSetItemColor.apply(this, arguments);
    //     if (key === "setColor") {
    //         console.log('Color changed to:', value);
    //     }
    // };

    const readings = {
    Red: {
        voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
        ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
    },
    Yellow: {
        voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
        ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
    },
    Green: {
        voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
        ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
    },
    Blue: {
        voltmeter: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
        ammeter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.59, 1.69, 1.83, 2.02, 2.16, 2.33, 2.5, 2.66, 2.83, 3, 3.17, 3.34],
    },
    };

    // function updateReadings() {
    //     const sliderValue = Math.round(slider.value * 5);
    //     const colorReadings = readings[currentColor];
    //     const voltValue = colorReadings.voltmeter[sliderValue].toFixed(2);
    //     const currValue = colorReadings.ammeter[sliderValue].toFixed(2);

    //     const svgDoc = svgObject.contentDocument;
    //     if (svgDoc) {
    //         const voltText = svgDoc.getElementById("volt");
    //         const currText = svgDoc.getElementById("curr");
    //         const bulbDot = svgDoc.getElementById("bulbcolor");
    //         if (voltText && currText && bulbDot) {
    //             voltText.textContent = voltValue;
    //             currText.textContent = currValue;
    //             voltText.setAttribute("fill", "#140000");
    //             currText.setAttribute("fill", "#140000");

               
    //             /*if (currValue >= 1.8) {
    //                 bulbDot.style.fill = currentColor.toLowerCase(); 
    //                 bulbDot.classList.add(`glow-${currentColor.toLowerCase()}`);
    //             } else {
    //                bulbDot.style.fill = 'none';
    //                 bulbDot.classList.remove('glow-red', 'glow-yellow', 'glow-green', 'glow-blue');
    //             }*/
    //           //   if (parseFloat(currValue) >= 1.8 && currentColor === 'Red') {  
    //           //     bulbDot.style.fill = currentColor.toLowerCase(); 
    //           //     bulbDot.classList.add(`glow-${currentColor.toLowerCase()}`);  
    //           // } else {
    //           //     bulbDot.style.fill = 'none';  
    //           //     bulbDot.classList.remove('glow-red', 'glow-yellow', 'glow-green', 'glow-blue'); 
    //           // }
    //           const glowThresholds = {
    //             Red: 1.4,
    //             Yellow: 1.8,
    //             Green: 2.0,
    //             Blue: 2.4
    //         };
        
    //         const threshold = glowThresholds[currentColor];

    //         if (currentColor === 'Red' && parseFloat(currValue) >= glowThresholds.Red) {
    //             bulbDot.style.fill = 'red';
    //             bulbDot.classList.add('glow-red');
    //         } else if (currentColor === 'Yellow' && parseFloat(currValue) >= glowThresholds.Yellow) {
    //             bulbDot.style.fill = 'yellow';
    //             bulbDot.classList.add('glow-yellow');
    //         } else if (currentColor === 'Green' && parseFloat(currValue) >= glowThresholds.Green) {
    //             bulbDot.style.fill = 'green';
    //             bulbDot.classList.add('glow-green');
    //         } else if (currentColor === 'Blue' && parseFloat(currValue) >= glowThresholds.Blue) {
    //             bulbDot.style.fill = 'blue';
    //             bulbDot.classList.add('glow-blue');
    //         } else {
    //             bulbDot.style.fill = 'none';
    //             bulbDot.classList.remove('glow-red', 'glow-yellow', 'glow-green', 'glow-blue');
    //         }

    //         }
    //     }
    // }

    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            currentColor = event.target.dataset.value; 
            dropdownButton.textContent = event.target.dataset.value;
            slider.value = 0;
            updateReadings(); 
        });
    });

    // slider.addEventListener("input", updateReadings); 
    // svgObject.onload = updateReadings; 

    // Setup dropdown functionality
    const setupItems = document.querySelectorAll(".setup-item");
    const setupButton = document.getElementById("setupDropdown");

    setupItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            setupButton.textContent = event.target.textContent;
            // Add any additional setup-specific logic here
        });
    });

    // LED dropdown functionality
    const ledItems = document.querySelectorAll(".led-item");
    const ledButton = document.getElementById("ledDropdown");

    ledItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            currentColor = event.target.dataset.value;
            ledButton.textContent = event.target.dataset.value;
            slider.value = 0;
            updateReadings();
        });
    });

    const setupDropdown = document.getElementById('setupDropdown');
    const mainSvg = document.getElementById('main-svg');

    // Setup dropdown functionality
    document.querySelectorAll(".setup-item").forEach((item) => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedSetup = this.getAttribute('data-value');
            
            // Update button text
            setupDropdown.textContent = this.textContent;
            
            // Change SVG based on selection
            if (selectedSetup === 'Plancks_Exp_Kit') {
                mainSvg.data = 'kit.svg';
                console.log(wireTerminalCheck, 'wireTerminalCheck')
            } else {
                mainSvg.data = 'Final_PC2.svg';
                
            }
        });
    });

    // Ensure the fillTable button is correctly linked to the fillTableValues function
    // fillTable.addEventListener('click', function (event) {
    //   event.preventDefault();
    //   const selectedColor = dropdownButton.textContent;
    //   if (selectedColor && tableFields[selectedColor]) {
    //     fillTableValues(selectedColor);
    //   }
    // });
});


var xValues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
  
  sequenceNum = 0;
  
  var rowData = { sno: 0, curr: 0, volts: 0 };
  sessionStorage.setItem("rowData", JSON.stringify(rowData));
  sessionStorage.setItem("fullScreen", false);
  
  
  var btnPressed = [false, false];
  
  setTimeout(() => {
  

    if(document.querySelector(".kit")){
      wireTerminalCheck = [
        { fourteen: false, fifteen: false },
        { sixteen: false, seventeen: false },
        { eighteen: false, twentysix: false },
        { twenty: false, twentyone: false },
        { twentytwo: false, twentythree: false }
      ];
    }else{
      wireTerminalCheck = [
        { one: false, resistor: false },
        { resistor: false, seven: false },
        { eight: false, four: false },
        { four:false, five: false},
        { seven: false, five: false },
        { eight: false, resistor: false },
        { resistor: false, six: false },
        { two: false, six: false },
      ];
    }
    enablingSequence(sequenceNum);
  }, 2000);
  
  function enablingSequence(sequenceNum) {
    sessionStorage.setItem("thresholdReached",false)
    sessionStorage.setItem("newIndex",0)
    sessionStorage.setItem("selectedColor","Red")
    sessionStorage.setItem("circuitComplete",false)
    if(document.querySelector(".forward")){
      sessionStorage.setItem("type",false);
      sessionStorage.setItem("circuitComplete", false);
    }else{
      sessionStorage.setItem("type",true);
      sessionStorage.setItem("circuitComplete", false);
    }
  
    if (sequenceNum <= wireTerminalCheck.length) {
      for (var key in wireTerminalCheck[sequenceNum]) {
        const elem = document.getElementsByClassName(key)[0];
        
        if (!elem) {
          console.error(`Element with class name "${key}" not found!`);
          continue; 
        }
    
        elem.style.stroke = "#FFFF00";
        elem.style.animationName = "pulse";
        elem.style.opacity = "1";
      }
    } else {
      console.error("sequenceNum exceeds wireTerminalCheck length.");
    }
    
  }
  
  function trial(componentSom) {
    componentSomMap = terminalMap[componentSom];
    // console.log(componentSomMap, 'componentSomMap');
    
    for (var key in wireTerminalCheck[sequenceNum])
      if (key == componentSomMap) wireTerminalCheck[sequenceNum][key] = true;
  
    elem = document.getElementsByClassName(componentSomMap)[0];
    elem.style.animationName = "none";
    elem.style.stroke = "none";

    dum = checkPair(sequenceNum);
    if (dum) {
      wireName = "wire" + (sequenceNum + 1);
      document.getElementById(wireName).style.transition = "display 10s";
      document.getElementById(wireName).style.display = "block";
      ++sequenceNum;
      if (sequenceNum < wireTerminalCheck.length) {
        enablingSequence(sequenceNum);
        // console.log('here')
      } else {
        // console.log('here')
        replacement();
      }
    }
  }
  
  function checkPair(sequenceNum) {
    count = 0;
    for (var key in wireTerminalCheck[sequenceNum])
      if (wireTerminalCheck[sequenceNum][key] == true) count++;
    // console.log(count, 'count')
    if (count == 2) return true;
    return false;
  }
  
  function keyPut() {
    document.getElementById("key1").style.animation = "none";
    document.getElementById("key1").onclick = function () {};
    document.getElementById("keyBase1").onclick = function () {};
  }
  
  function replacement() {
  // Power button setup
  // document.getElementById("power-btn").style.stroke = "yellow";
  // document.getElementById("power-btn").style.strokeWidth = "0.25%";
  // document.getElementById("power-btn").onclick = function () {
  //   checkbtnPressed(0);
  // };

  // // Key setup
  // document.getElementById("key1").style.display = "block";
  // document.getElementById("key1").classList.add("key-up-down");
  // document.getElementById("key1").onclick = function () {
  //   checkbtnPressed(1);
  //   keyPut();
  // };
  // document.getElementById("keyBase1").onclick = function () {
  //   checkbtnPressed(1);
  //   keyPut();
  // };
  sessionStorage.setItem("fullScreen", true);
  sessionStorage.setItem("circuitComplete", true);
  checkcolor();
}
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function checkbtnPressed(btnNum) {
    btnPressed[btnNum] = true;
    if (btnNum == 0) {
      document.getElementById("power").textContent = "05.00";
      document.getElementById("volt").textContent = "00.00";
      document.getElementById("power-btn").style.strokeWidth = "0%";
    }
    if (btnPressed[0] && btnPressed[1]) {
      sessionStorage.setItem("circuitComplete", true);
      sessionStorage.setItem("circuitComplete",true)
    }
  }




