# AutomationApp


Installation
------------

Clone repository into your local environment:

```
https://github.com/OGurel24/AutomationApp.git
```

Install package dependencies:

```
npm install
```

Run cases

All cases (most common case)
```
npm run all_tests 
```
All cases headed
```
npm run all_tests_headed 
```
Only UI cases
```
npm run ui_tests
```
Only UI cases headed
```
npm run ui_tests_headed
```
Only API cases
```
npm run api_tests
```
Only API cases headed
```
npm run api_tests_headed
```

CI/CD
------------

Repository have Github Actions integration. You can run test cases in Actions tab. 
Please check .github/workflows/main.yml file. 

```
https://github.com/OGurel24/AutomationApp/actions
```

Calliope.pro Integration
------------

All the execution reports are uploading to calliope.pro platform with post hook after execution.
You can check exist reports with given link

```
https://app.calliope.pro/profiles/4390
```

Calliope.pro Suggestions
------------

One of the main points which I realized is report time is not reliable in All Reports section. 
For instances, once, it showed 20 minutes ago as report time, however report uploading finished only 1 minute ago.
That feature should have been more reliable in order to prevent unnecessary confusion of user.

As a user for couple of days, my personal new feature suggestions would be adding select checkboxes for each report in 
'All Reports' page(https://app.calliope.pro/profiles/{id}/reports). Whenever I need to clear my reports since limit, I
have deleted previous reports one by one, and it was extremely boring user experience. Hence, in my opinion, user should
be able to bulk operations in All Reports page.

Test Case Selection and Importance of Selected Cases
------------

The most probable scenarios within a limited time are included. The 80/20 principle was applied. 
The principle explains that the most important 80% is 20% of the product. 
(https://en.wikipedia.org/wiki/Pareto_principle)

The most important and most likely to come into contact with the user were covered. 
This was the most basic principle in case selection. 
Importance criteria was the possibility of the user' usage of specific point

Future of the Project
------------

Future of the project could be seperated as two different types of improvements: New case selection and infrastructural

New case selection: More API cases could be added according to usage ratio of the users but UI side is already
covered 100% since all the 18 case is equally important and none of them is proper to skip even first draft.

Infrastructure: POM(Page Object Model) and BDD(Behaviour-Driven Development) principles are possible candidates on 
further steps. However, at the given point, cases are simple enough to maintain for changes and applying those can be
commented as over engineering. In any possibility about the expansion of the cases, those may become next steps. 

Also, a Dockerfile might be good option, even though repository have CI/CD options with Github Actions, since increased
number of the people which works on the project may cause compatibility issues. Moreover, parallel run could be achieved
but currently all the suite execution is 2 minutes approximately. It is skipped at this point since giving a high 
amount of the resources for 2 minutes test suite would be an unoptimized resource allocation