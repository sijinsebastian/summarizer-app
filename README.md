# SummarizerApp

This project demonstrates the use of Chrome api to make use of browser's built-in AI. In this example, the summarizer use case is highlighted.


## The AI: 
Gemini Nano, currently (Dec 2024) available only as a trial origin ( from chrome 131 - 136, if I remember correctly). It is a locally run AI model, which is downloaded on the first instantiation. Web pages can reuse the same ai model, if available, with the advantage of reusing a model and local execution.


## Test:

It is an angular application.
Use `ng serve` to run the application.
Go to http://localhost:4200 and enter a text to see a summary.

Tested with Chrome Canary, Version 133.0.6871.0 (Official Build)