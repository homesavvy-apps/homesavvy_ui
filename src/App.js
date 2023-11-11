import logo from './logo.svg';
import './App.css';
import "survey-core/defaultV2.min.css"
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback } from 'react';

const surveyJson = {
  pages: [{
      elements: [{
          name: "satisfaction-score",
          title: "How would you describe your experience with our product?",
          type: "radiogroup",
          choices: [
              { value: 5, text: "Fully satisfying" },
              { value: 4, text: "Generally satisfying" },
              { value: 3, text: "Neutral" },
              { value: 2, text: "Rather unsatisfying" },
              { value: 1, text: "Not satisfying at all" }
          ],
          isRequired: true
      }]
  }, {
      elements: [{
          name: "what-would-make-you-more-satisfied",
          title: "What can we do to make your experience more satisfying?",
          type: "comment",
      }, {
          name: "nps-score",
          title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
          type: "rating",
          rateMin: 0,
          rateMax: 10
      }],
  }, {
      elements: [{
          name: "how-can-we-improve",
          title: "In your opinion, how could we improve our product?",
          type: "comment"
      }],
  }, {
      elements: [{
          name: "disappointing-experience",
          title: "Please let us know why you had such a disappointing experience with our product",
          type: "comment"
      }],
  }]
};

// ...
// const SURVEY_ID = 1;

function App() {
  const survey = new Model(surveyJson);
  const surveyComplete = useCallback((sender) => {
    saveSurveyResults(
      "http://localhost:3001/survey",
      sender.data
    )
  }, []);

  survey.onComplete.add(surveyComplete);

  return <Survey model={survey} />;
}

function saveSurveyResults(url, json) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(json)
  })
  .then(response => {
    if (response.ok) {
      // Handle success
    } else {
      // Handle error
    }
  })
  .catch(error => {
    // Handle error
  });
}


export default App;
