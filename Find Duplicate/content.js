(function() {
  // Object to store frequency of user IDs
  let userIdCounts = {};

  // Get all rows where user data is stored
  const userRows = document.querySelectorAll('tr.ng-scope .col-xs-1.col-sm-1.col-md-1.ng-binding');

  // Extract user IDs from each row and count their occurrences
  userRows.forEach(row => {
      const userIdElement = row.parentElement.querySelector('.hidden-xs span.ng-binding');
      if (userIdElement) {
          const userId = userIdElement.textContent.trim();
          
          // Increment the count for each user ID
          if (userId in userIdCounts) {
              userIdCounts[userId]++;
          } else {
              userIdCounts[userId] = 1;
          }
      }
  });

  // Find user IDs that appear more than once and format them as "ID (count x)"
  const duplicates = Object.entries(userIdCounts)
      .filter(([userId, count]) => count > 1)  // Only consider duplicates
      .map(([userId, count]) => `${userId} (${count}x)`)  // Format the output

  // Display the result in the console and as an alert
  if (duplicates.length > 0) {
      console.log('Duplicate User IDs found:', duplicates.join('\n'));  // New line separated
      alert('Duplicate User IDs:\n' + duplicates.join('\n'));  // New line separated in the alert
  } else {
      console.log('No duplicate User IDs found.');
      alert('No duplicate User IDs found.');
  }
})();
