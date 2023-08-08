# gmail-to-kindle
## Follow this steps
1. Login on your google account.
2. Create a file in [Apps Script](https://script.google.com/home).
3. Add or copy the code to the file.
4. Put in the variables the values indicated in their name. **For example:** var *label*: *'newsletters'*;
5. Add a filter in your gmail to automatically add certain emails to the defined label.
6. Run the Trigger, it will run every 10 minutes to check if there are new emails.
## Notes
  - This script was initially made to read newsletters.
  - If there is a response to the e-mail, it will not be sent to the Kindle as it only sends the first message of an e-mail thread
  - The file sent will be in pdf

