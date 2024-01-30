### Project Issues Tracker: Documentation

Api routes:

*   **POST** `/api/issues/{projectname}` with form data containing **required** _issue_title_, _issue_text_, _created_by_, and **optional** _assigned_to_ and _status_text_.  
    if successful, returns a JSON object of newly created issue
 `{ "issue_title": "boss is missing", "issue_text": "Hi i am a minion", "created_by": "stuart", "assigned_to": "jerry", "status_text": "no clue, where to look", "open": true, "created_on": "2018-10-05T11:59:40.806Z", "updated_on": "2018-10-05T11:59:40.806Z", "_id": "5bb7522ef8c8590de76af953" }`

*   **PUT** `/api/issues/{projectname}` with a the form data containing _***_id**_ and any fields in the object with a value. e.g _issue_title_ etc..  
    Returned will be 'successfully updated' also updates the field _updated_on_ to current time of update. if failed returns 'could not update'.

*   **DELETE** `/api/issues/{projectname}` with a **_*_id_** to completely delete an issue. If no _id is sent returns '_id error', or success: 'deleted '+_id, or if failed: 'could not delete '+_id.

*   **GET** `/api/issues/{projectname}` returns an array of all issues on that specific project with all the information for each issue as was returned when posted.  
    you can also make a GET request by passing along any field and value in the query e.g. `/api/issues/{project}?open=false`

### Example usage:

`GET /api/issues/{project}`  
`GET /api/issues/{project}?open=true&assigned_to=Joe`  

### Example return:

`[{"_id":"5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]`  

### EXAMPLE:

Get all the issues on project [_https://project-issues-tracker.glitch.me/apitest/_](https://project-issues-tracker.glitch.me/apitest/)

For more information visit: [_https://project-issues-tracker.glitch.me/_](https://project-issues-tracker.glitch.me/)