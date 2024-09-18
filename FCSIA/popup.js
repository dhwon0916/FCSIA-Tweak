document.getElementById('searchAndAdd').addEventListener('click', () => {
    // Get the value from the textarea
    let inputText = document.getElementById('itemName').value.trim();
  
    if (inputText) {
      // Split the input into multiple items (split by spaces, commas, or newlines)
      let items = inputText.split(/[\s,]+/).filter(item => item.length > 0);
  
      // Remove '@fcstu.org' from any items that have it
      items = items.map(item => {
        if (item.endsWith('@fcstu.org')) {
          return item.replace('@fcstu.org', '');
        }
        return item;
      });
  
      // Remove duplicates by converting the array to a Set and back to an array
      let uniqueItems = [...new Set(items)];
  
      // Send each unique item to the content script for processing
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        uniqueItems.forEach(itemName => {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: findAndClick,
            args: [itemName]
          });
        });
      });
    } else {
      console.log('Please enter at least one valid item name.');
    }
  });
  
  // This function is injected into the webpage and executed to find the item and click the Add button
  function findAndClick(targetText) {
    // Query all rows in the table that have user information
    let rows = document.querySelectorAll('tr[ng-repeat="u in users"]');  // Adjust the selector if necessary
  
    rows.forEach(row => {
      // Find the cell with the user identifier (e.g., "203373761") in the third column
      let userIdElement = row.querySelector('.col-xs-2.ng-binding');
  
      if (userIdElement && userIdElement.innerText.trim() === targetText) {
        // Now find the "Add" button in the same row
        let addButton = row.querySelector('button.btn.btn-sm.btn-success[ng-click="addAttendance(u, attendeeRequired)"]');
        
        // Check if the button is present and visible
        if (addButton && addButton.style.display !== 'none') {
          addButton.click();
          console.log(`Clicked add button for user ID ${targetText}`);
        } else {
          console.log(`Add button for user ID ${targetText} is not clickable or user already added.`);
        }
      }
    });
  }
  