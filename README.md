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