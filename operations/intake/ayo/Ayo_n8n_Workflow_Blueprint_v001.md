# A'YO n8n WORKFLOW BLUEPRINT — v001
Get That Art Studios | Intake Automation

## PURPOSE
Automate A’yo’s intake flow from inquiry to confirmed booking reminder.

---

## WORKFLOW NAME
A'yo — Intake Control Pipeline

---

## TRIGGER
### Webhook: New Inquiry Submitted
Expected fields:
- full_name
- phone
- email
- tattoo_idea
- placement
- size
- style
- reference_links
- preferred_timing
- budget_context

---

## NODE MAP

### 1. Webhook — New Inquiry
Receives client submission from website form, intake app, or booking page.

### 2. Set — Normalize Intake Data
Clean and map incoming fields into standardized variable names.

Example normalized fields:
- clientName
- clientPhone
- clientEmail
- tattooIdea
- placement
- size
- style
- references
- timing
- budget

### 3. IF — Missing Required Details
Check if any key fields are empty:
- tattooIdea
- placement
- size
- phone or email

#### If YES:
Go to:
- SMS / Email — Need More Info

#### If NO:
Continue forward

### 4. SMS / Email — Need More Info
Send:
“Hey, this is A’yo with Get That Art Studios. Before we move forward, I need a little more clarity on your request:
- placement
- approximate size
- reference image if you have one
Once that’s in, we can move cleaner on your tattoo plan.”

Then:
- mark record as Pending Clarity
- stop workflow until resubmission / update

### 5. Database Record — Create Intake Entry
Save inquiry into tracking system.

Suggested fields:
- clientName
- clientPhone
- clientEmail
- tattooIdea
- placement
- size
- style
- references
- timing
- budget
- status = New Inquiry
- source = website / app / manual

Suggested tools:
- Airtable
- Google Sheets
- Notion
- CRM table

### 6. SMS / Email — Inquiry Received
Send:
“Hey, this is A’yo with Get That Art Studios. We got your tattoo inquiry. I’m reviewing your request now. If anything is missing, I’ll let you know so we can keep things clear and moving.”

### 7. Internal Review Tag
Assign internal status:
- Needs Clarity
- Ready for Estimate
- Ready for Booking
- Hold

This can be manual or logic-based.

### 8. IF — Booking Ready
If request is complete and approved:
- go to Deposit Request

If not:
- hold for manual follow-up

### 9. SMS / Email — Deposit Request
Send:
“Hey, this is A’yo with Get That Art Studios. Your request looks clear enough to move forward. Next step is locking your booking with the required deposit. Once that’s in, your appointment can be confirmed.”

Update status:
- Awaiting Deposit

### 10. Wait — Deposit Window
Wait period:
- 24 hours
or
- custom booking window

### 11. IF — Deposit Received
If YES:
- continue to Booking Confirmed

If NO:
- send deposit reminder

### 12. SMS / Email — Deposit Reminder
Send:
“Hey, this is A’yo with Get That Art Studios. This is your reminder that your appointment is waiting on the deposit to be locked in. Once received, we’ll confirm your session details.”

Status remains:
- Awaiting Deposit

### 13. SMS / Email — Booking Confirmed
Send:
“Hey, this is A’yo with Get That Art Studios. Your appointment is confirmed.

Details:
- Date:
- Time:
- Tattoo:
- Placement:

Watch for your prep reminder before your session.”

Update status:
- Confirmed

### 14. Wait — Pre-Appointment Reminder
Wait until:
- 24 hours before appointment
or
- custom reminder time

### 15. SMS / Email — Final Prep Reminder
Send:
“Hey, this is A’yo with Get That Art Studios. Reminder for your upcoming appointment:
- arrive on time
- come hydrated
- avoid showing up rushed
- make sure your session details are still correct
If anything changed, respond before the appointment.”

Update status:
- Reminder Sent

---

## OPTIONAL BRANCHES

### Reschedule Branch
Trigger if client replies with reschedule request.

Send:
“Hey, this is A’yo with Get That Art Studios. I got your reschedule request. I’m reviewing the booking status now and will guide you through the next available move.”

### No Response Branch
If client never completes missing information:
- follow up once
- mark cold lead if no response after window

### Estimate Branch
If you want separate estimate approval before deposit:
- send estimate
- wait for approval
- then request deposit

---

## STATUS VALUES
Recommended status list:
- New Inquiry
- Pending Clarity
- Ready for Estimate
- Ready for Booking
- Awaiting Deposit
- Confirmed
- Reminder Sent
- Reschedule Requested
- Cold Lead

---

## PI RULE
Entry discipline creates session discipline.

A’yo removes uncertainty before the appointment begins.

---

## BRAND LINE
A’yo = Intake Control
Clear in. Clean work.
{
  "workflow_name": "A'yo — Intake Control Pipeline",
  "trigger": "New inquiry submitted",
  "steps": [
    "Normalize intake data",
    "Check missing required details",
    "If missing -> send Need More Info",
    "Create intake record",
    "Send Inquiry Received",
    "Tag internal status",
    "If booking ready -> send Deposit Request",
    "Wait for deposit window",
    "If deposit not received -> send Deposit Reminder",
    "If deposit received -> send Booking Confirmed",
    "Wait until pre-appointment reminder time",
    "Send Final Prep Reminder"
  ],
  "statuses": [
    "New Inquiry",
    "Pending Clarity",
    "Ready for Estimate",
    "Ready for Booking",
    "Awaiting Deposit",
    "Confirmed",
    "Reminder Sent",
    "Reschedule Requested",
    "Cold Lead"
  ]
}