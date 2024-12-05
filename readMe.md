# Interface 1 - Patient Registration #
* * *
* * *
A level one header will be used to define the page as "Patient Registration"
Each section of the registration form will be marked by text with a level 3 header, and the individual inputs will be denoted with a level 4 header text defining the entry (denoted in this document by bold text).

Primarily the patient will be able to enter their **Personal Information** 
- Name (Last, First, Pronouns)
- Age
- Sex (option array of two options)
- Health Card No.
- Private Insurance No.
 
The interface will present the ability to select a **condition** based on location within the body. This will be presented as a pull-down menu with a scrollable interface.

Additionally the patient will be able to identify if the **condition** is wound, pain, or illness based from a set of check boxes, to cover the event it may be all three.

Then the patient can indicate the **current level of pain** they are experiencing on a scale of 0-10, with descriptors at 0, 5, and 10 to define the scale. This will be acheived with a series of option buttons.

There will be a text input available for **current medications**; a text input for **current medical conditions**; **past medical conditions**; and a text input for **allergies**.

At the bottom of the page will be a Submit button. Upon clicking the button a three digit number will be displayed in an alert, indicating this is the **Patient ID** and the web link for monitoring wait times, and offering a "Finish" button to return to the patient registration page.
* * *
### Technical Specifications of Patient Interface ###
* * *
Patients will be managed as a json object with keys : values of:
- "patientId" : long ("displayId" + "checkedInTime")
- "displayId" : int (random 3-digit code)
- "checkedInTime" : long (timestamp at time of creation, UNIX time)
- "timeWaiting" : long (current time - checkedInTime)
- "triaged" : boolean (default: false, set by admin)
- "urgency" : int
- "severity" : int (0-4)
- "admitted" : int (0-2)
- "firstName" : String
- "lastName" : String
- "pronouns" : "String"
- "age" : int
- "biologicalSex" : boolean
- "publicHealthNum" : long
- "privateHealthNum" : long
- "conditionCode" : int (to be coded into a companion array to differentiate multiple values)
- "conditionType" : int (to be coded into a companion array to differentiate multiple values)
- "painLevel" : int
- "medications" : String
- "medicalPresent" : String
- "medicalHistory" : String
- "allergies" : String

**patientId** a concatenation of "displayId" and "checkedInTime"
**biologicalSex** (female : true, male : false)
**pronouns** ArrayList(String - 5)
- "she/her"
- "he/him"
- "they/them"
- "xie/hir"
- "prefer not to specify"

**conditionCode** coded into a json of key : values
- "chest" : 0
- "head" : 1
- "abdomen" : 2
- "pelvis" : 3
- "armsLegs" : 4
- "handsFeet" : 5

**conditionType** coded into a json of key : values
  - "unconcious" : 0
  - "traumaWound" : 1
  - "pain" : 2
  - "illness" : 3

**painLevel** ArrayList(int - 11)

**urgency** A calculated value based on the sum of "conditionCode", "conditionType", and "painLevel"

**severity** Established after triage.

Clicking the "Submit" button will calculate and instantiate the new patient object and convey it to the server DB.

* * *
* * *
# Interface 2 - Admin Dashboard
* * *
* * *
A level 1 header will be used to define the admin page as **"Triage Dashboard"**. The admin display will be divided into two scrollable lists. The left list will be **new patients**, sorted by timestamp, descending. And the right list will be **triaged patients** sorted by **severity**, ascending, a function of **urgency** and **timeWaiting**. Each list will be denoted by a level 3 header for easy recognition. The new patient list will have a **"Triage"** button beneath it, and the triaged patient list will have an **"Admit"** button and a **"Dismiss"** button (in the event a patient leaves/dies).

The admin will be able to select a new patient from the list, and click the button associated with the list, which will only become active when a list item is selected. When the buttons are clicked, it will launch a confirmation dialog asking "**Triage Patient**", "**Admit Patient**", and "**Discharge Patient**" while displaying the patient's full name, ID, Condition and Severity to add a fail-safe to the patient processing process. 

The Triaged Patients list will update utomatically based on the severity algorithm. The **urgency** value will be paramount and the severity level will advance by one with every 90 minutes in the queue with advancement stopping at level 1, so there is always precedence to a level 0 emergency.
Each severity level will then be governed by urgency alone to ensure people with a heart condition get in before a hangnail.
* * *
### Techinical specifications of Admin Interface ###
* * *
**severity**: **urgency** level + 1 for every 90 minutes of wait time, stopping at level one.
- level 0: Immediate, life-saving intervention required without delay
- level 1: High risk of deterioration, or signs of a time-critical problem
- level 3: Stable, with multiple types of resources needed to investigate or treat (such as lab tests plus diagnostic imaging) (resources are not factored in to the system at this time.)
-  level 4: Stable, with only one type of resource anticipated (such as only an x-ray, or only sutures)
-  level 5: Stable, with no resources anticipated except oral or topical medications, or prescriptions
  (Wikipedia Contributors, 2024)

**newPatientList** json collection of patient jsons. Ordered by most recent **checkInTime**.
- this list will be appended by each new addition.

**triageList** json collection of patient jsons. Ordered by **severity**, updated by the second.
- this list will have two partner lists that will be populated for sorting purposes.
	- timestamp json - keep track of who has been waiting longest. Values:
		- "wait" : floor(**timeWaiting**/5400)
		- **patientId**
	- urgency json - maintain severity levels. Values:
		- **urgency**
		- **patientId**
* * *
# Interface 3 - Wait List Display #
This page will allow the user to enter their name and 3-letter ID, and it will respond with an approximate wait time (for the purposes of testing, each patient will have a 45 minute appointment time). After the wait time is displayed, a refresh button will be enabled to allow the patient to **update** their time if they have not navigated away from the page. No user information/cookies will be stored on this page, so the patient will have to re-enter information if they navigate away.

There will be two text inputs, one for patient (First, Last) name, and another for the three digit ID provided at the time of registration.

**patientName** will comprise two input fields, **firstName** and **lastName** and they will match the names with corresponding the ID field - providing an error if the names do not match.
- The error alert will state: "**The information does not match a patient in our records, please re-enter your information.**" with an **OK** button to dismiss the alert.

**displayId** will have a 3-digit number field, and will only accept integers as input. The above error alert will be produced if there is not a matching ID.

* * *
* * *
# Design Elements #
* * *
* * *
### Fonts ###
For readability purposes I will be using:
- Headers - `"Helvetica", sans serif` 
- Body - `"Helvetica", sans serif`

### Colours ###
I will be using the "Fiery Fusion" palette (Pruis, 2024) consisting of:
- Primary Colour: Candy Apple `#DC143C`
- Light Mode: Wisp Pink `#FDEDED`
- Dark Mode: Nile Blue `#18404A`
- Accent 1: Pacific Blue `#05B2BC`
- Accent 2: Milan `#FEFEA8`
- Accent 3: Pearl `#E7DFD0`
	- Text on (Primary, Dark, Accent 1): White `#FFFFFF`
	- Text on (Light, Accent 2, Accent 3): Black `#000000`

### Header & Alerts
Wisp Pink background with Nile Blue Text. Inverted for Dark Mode.

### Buttons
Nile blue fill with White text (light mode), Wisp Pink fill with black text (dark mode).

### Text Inputs & List Boxes
Nile Blue outline with Milan fill and black text(light). Milan outline with Pacific Blue fill and white text (dark).

### Option Arrays & Check Boxes
Nile Blue outline, Wisp Pink fill, Candy Apple selection indicator (light). Wisp Pink outline, Nile Blue fill, Pearl selection indicator (dark).

### Footer 
Cady Apple Background, Wisp Pink Text (light). Inverted for dark.

### Body 
Wisp Pink Background.



* * *
* * *
### References ###
Wikipedia contributors. (2024, August 27). Emergency Severity Index. In Wikipedia, The Free Encyclopedia. Retrieved 17:47, December 3, 2024, from https://en.wikipedia.org/w/index.php?title=Emergency_Severity_Index&oldid=1242556887

Pruis, K. (2024, May 14). 13 Accessible Color Palettes for Stunning, User-Friendly Designs. Retrieved Dec 03, 2024, from kdesign.co: https://kdesign.co/blog/accessible-color-palettes-for-stunning-user-friendly-designs/

