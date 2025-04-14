// Dropdown button and table element references
const dropdownButton = document.getElementById('dropdownMenuButton');
const circuitcomp = document.getElementById('circ-comp');
const fillTable = document.getElementById('fill-table');

// Map table input IDs to easily update values
const tableFields = {
  Red: ['led-r', 'w-r', 'V-r', 'E-r', 'F-r', 'h-r'],
  Yellow: ['led-y', 'w-y', 'V-y', 'E-y', 'F-y', 'h-y'],
  Green: ['led-g', 'w-g', 'V-g', 'E-g', 'F-g', 'h-g'],
  Blue: ['led-b', 'w-b', 'V-b', 'E-b', 'F-b', 'h-b'],
};

// Data for table values
const tableData = {
  Red: ["6950", "1.8", "24", "6", "6.634e-34"],
  Yellow: ["5900", "2.1", "24", "6", "5.75e-34"],
  Green: ["5700", "2.4", "24", "6", "7.85e-34"],
  Blue: ["4720", "3.0", "24", "6", "6.1e-34"],
};

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const selectedColor = this.getAttribute('data-value');

    // Update dropdown button text
    dropdownButton.textContent = selectedColor;

    // Fill table automatically when color is selected
    if (selectedColor && tableFields[selectedColor]) {
      fillTableValues(selectedColor);
    }
  });
});

fillTable.addEventListener('click', function (event) {
  event.preventDefault();
  const selectedColor = dropdownButton.textContent;
  // Verify the selected color is valid
  if (selectedColor && tableFields[selectedColor]) {
    fillTableValues(selectedColor);
  }
});

function fillTableValues(color) {
  // Check if color exists in both data structures
  if (!tableFields[color] || !tableData[color]) {
    console.error(`Invalid color selection: ${color}`);
    return;
  }

  const fields = tableFields[color];
  const values = tableData[color];

  try {
    // Set the first field (LED input value) to the color name
    const firstField = document.getElementById(fields[0]);
    if (firstField) {
      firstField.value = color;
    }

    // Loop through the remaining fields and update their values
    for (let i = 1; i < fields.length; i++) {
      const field = document.getElementById(fields[i]);
      if (field && values[i - 1] !== undefined) {
        field.value = values[i - 1];
      }
    }
  } catch (error) {
    console.error('Error filling table values:', error);
  }
}

// Function to update table values dynamically
function updateTableValues(color) {
  if (!tableFields[color] || !tableData[color]) return;

  // Get the fields and values for the selected color
  const fields = tableFields[color];
  const values = tableData[color];

  // Set the first field (LED input value) to the color name
  document.getElementById(fields[0]).value = color;

  // Loop through the remaining fields and update their values
  for (let i = 1; i < fields.length; i++) {
    document.getElementById(fields[i]).value = values[i - 1];
  }
}

// // graph

// Energy values in Joules
const energyValues = [2.8836e-19, 3.3642e-19, 3.8448e-19, 4.806e-19];
const frequencyValues = [4.2857e14, 5.0847e14, 5.6604e14, 6.3829e14];

let chartInstance = null; // Keep track of Chart.js instance

function drawGraph() {
  const canvas = document.getElementById('popupGraph');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  const ctx = canvas.getContext('2d');

  // Destroy the existing chart instance if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Create data points in {x, y} format for the line chart
  const dataPoints = frequencyValues.map((freq, index) => ({
    x: freq,
    y: energyValues[index],
  }));

  // Create a new Chart.js instance for the line chart
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Energy vs. Frequency',
          data: dataPoints,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,  // Line chart without filling
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Frequency (Hz, Log Scale)',
          },
          min: 4e14,  // Adjusted min value for better visualization
          max: 7e14,  // Adjusted max value for better visualization
          ticks: {
            callback: function (value) {
              return value.toExponential(1);  // Display values in exponential form
            },
            stepSize: 1e14,  // Control step size for tick marks
          },
        },
        y: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Energy (J, Log Scale)',
          },
          min: 2.8e-19,  // Adjusted min value for better visualization
          max: 5e-19,  // Adjusted max value for better visualization
          ticks: {
            callback: function (value) {
              return value.toExponential(1);  // Display values in exponential form
            },
            stepSize: 0.05e-19,  // Control step size for tick marks
          },
        },
      },
    },
  });
}

// Call rawGraph function to display the graph
drawGraph();


// Show modal and draw graph
document.getElementById('showGraph').addEventListener('click', (event) => {
  event.preventDefault();
  const modal = document.getElementById('graphModal');
  modal.style.display = 'block';  // Changed to style.display
  modal.classList.add('show');
  
  // Destroy existing chart if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Small delay to ensure modal is visible before drawing
  setTimeout(() => {
    drawGraph();
  }, 100);
});

// Close modal when clicking the close button
document.getElementById('closeModal').addEventListener('click', () => {
  const modal = document.getElementById('graphModal');
  modal.style.display = 'none';
  modal.classList.remove('show');
  // Destroy chart instance when closing
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  const modal = document.getElementById('graphModal');
  if (event.target === modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
    // Destroy chart instance when closing
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  }
});

document.getElementById('closeModal').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent any default action (e.g., form submission)
  document.getElementById('graphModal').style.display = 'none'; // Hide the modal
});


// Slope function 


// // pdf generation by html2canvas and jsPDF

// document.getElementById('downloadPdf').addEventListener('click', async () => {
//   const { jsPDF } = window.jspdf;
//   const pdf = new jsPDF();

//   const modal = document.getElementById('graphModal');
//   const graphCanvas = document.getElementById('popupGraph');
//   const obsTable = document.getElementById('table1');

//   // Temporarily display the modal
//   modal.style.display = 'block';

//   try {
//     // Wait for the modal to fully render
//     await new Promise((resolve) => setTimeout(resolve, 300)); // Adjust delay if necessary

//     // Capture the table
//     const tableCanvas = await html2canvas(obsTable, {
//       useCORS: true,
//       allowTaint: false,
//     });
//     const tableImgData = tableCanvas.toDataURL('image/png');
//     pdf.addImage(tableImgData, 'PNG', 10, 10, 190, 100); // Adjust dimensions

//     // Capture the graph canvas directly
//     const graphCanvasImage = graphCanvas.toDataURL('image/png');
//     pdf.addPage(); // Add new page for graph
//     pdf.addImage(graphCanvasImage, 'PNG', 10, 10, 190, 100); // Adjust dimensions

//     // Capture the entire modal as an image
//     const modalCanvas = await html2canvas(modal, {
//       useCORS: true,
//       allowTaint: false,
//     });
//     const modalImage = modalCanvas.toDataURL('image/png');
//     pdf.addPage(); // Add new page for modal
//     pdf.addImage(modalImage, 'PNG', 10, 10, 190, 100); // Adjust dimensions

//     // Save the PDF
//     pdf.save('Plancks_Constant.pdf');
//   } catch (error) {
//     console.error('Error capturing canvas or modal:', error);
//     alert('Could not capture the graph. Please check console for details.');
//   } finally {
//     // Hide the modal again
//     modal.style.display = 'none';
//   }
// });



document.getElementById('downloadPdf').addEventListener('click', async () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const modal = document.getElementById('graphModal');
  const graphCanvas = document.getElementById('popupGraph');
  const obsTable = document.getElementById('table1');

  // Temporarily display the modal
  modal.style.display = 'block';

  try {
    // Wait for the modal to fully render
    await new Promise((resolve) => setTimeout(resolve, 300)); // Allow rendering delay if needed

    // Capture the observation table
    const tableCanvas = await html2canvas(obsTable, {
      useCORS: true,
      allowTaint: false,
    });
    const tableImgData = tableCanvas.toDataURL('image/png');
    pdf.addImage(tableImgData, 'PNG', 10, 10, 190, 100); // Adjust dimensions as necessary

    // Capture the graph canvas directly
    const graphCanvasImage = graphCanvas.toDataURL('image/png');
    pdf.addPage(); // Add new page for graph
    pdf.addImage(graphCanvasImage, 'PNG', 10, 10, 190, 100); // Adjust dimensions as necessary

    // Capture the modal as an image
    const modalCanvas = await html2canvas(modal, {
      useCORS: true,
      allowTaint: false,
    });
    const modalImage = modalCanvas.toDataURL('image/png');
    pdf.addPage(); // Add new page for modal
    pdf.addImage(modalImage, 'PNG', 10, 10, 190, 100); // Adjust dimensions as necessary
    
    const totalPages = pdf.getNumberOfPages();
    // console.log(totalPages);
    pdf.deletePage(totalPages); // Delete the last page (blank page)
    
    // Save the PDF
    pdf.save('Plancks_Constant.pdf');
  } catch (error) {
    console.error('Error capturing canvas or modal:', error);
    alert('Could not capture the graph. Please check console for details.');
  } finally {
    // Hide the modal after processing
    modal.style.display = 'none';
  }
});

