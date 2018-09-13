var express = require('express');
var router = express.Router();
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');


let nlu;

if (process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY
  && process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY !== '') {
  nlu = new NaturalLanguageUnderstandingV1({
    version: '2018-04-05',
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL || 'https://gateway.watsonplatform.net/natural-language-understanding/api',
    iam_apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY || '<iam_apikey>',
    iam_url: process.env.ASSISTANT_IAM_URL || 'https://iam.bluemix.net/identity/token',
  });
} else {
  nlu = new NaturalLanguageUnderstandingV1({
    version: '2018-04-05',
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL || 'https://gateway.watsonplatform.net/natural-language-understanding/api',
    username: process.env.NATURAL_LANGUAGE_UNDERSTANDING_USERNAME || '<username>',
    password: process.env.NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD || '<password>',
  });
}


function processResponse(response) {
  console.log('Processing Response')
  var output = `<h1>Response</h1>`
  output += processEntities(response['entities'])
  output += processKeywords(response['keywords'])
  return output
}

//Process Keywords list
function processKeywords(keywords) {
  var output = `<h2>Keywords</h2>`
  for (i in keywords) {
    var word = keywords[i]
    output += `<p>Keyword: ${word.text}. Relevance: ${word.relevance}.`
    if (word.sentiment) {
      output += ` Sentiment: ${word.sentiment.label}`
    }
    if (word.emotion) {
      output += ` ${processEmotion(word.emotion)}`
    }
    output += `</p>`
  }
  return output
}

// Process Entities List
function processEntities(entities) {
  var output = `<h2>Entities</h2>`
  for (i in entities) {
    var entity = entities[i]
    output += `<p>Entity: ${entity.text}. Type: ${entity.type} Relevance: ${entity.relevance}. Count: ${entity.count}`
    if (entity.sentiment) {
      output += ` Sentiment: ${entity.sentiment.label}`
    }
    if (entity.emotion) {
      output += ` ${processEmotion(entity.emotion)}`
    }
    output += `</p>`
  }
  return output
}

// Return the strongest emotion
function processEmotion(emotion) {
  var strength = emotion.sadness
  var emotionStr = "Sadness"
  if (strength < emotion.joy ) {
        emotionStr = "Joy"
        strength = emotion.joy
  }
  if (strength < emotion.fear ) {
        emotionStr = "Fear"
        strength = emotion.fear
  }
  if (strength < emotion.disgust ) {
        emotionStr = "Disgust"
        strength = emotion.disgust
  }
  if (strength < emotion.anger ) {
        emotionStr = "Anger"
        strength = emotion.anger
  }

  return `Strongest Emotion: ${emotionStr}`
}

/* GET Sample listing. */
router.get('/sample', function(req, res, next) {
  var parameters = {
    'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
    'features': {
      'entities': {
        'emotion': true,
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
      }
    }
  }

  nlu.analyze(parameters, function(err, response) {
    if (err) {
      console.log('error:', err);
      res.send('Error Processing NLU');
    }
    else {
      // console.log(JSON.stringify(res, null, 2));
      // res.send(JSON.stringify(response));
      res.send(processResponse(response))
    }

  });
});

/* GET Sample listing. */
router.get('/sampleResponse', function(req, res, next) {

  var sampleResponse = require('./sampleNLUResponse.json')
  output = processResponse(sampleResponse);
  res.send(output)

});

router.get('/sampleResponse2', function(req, res, next) {

  var sampleResponse2 = require('./sampleNLUResponseMine.json')
  output = processResponse(sampleResponse2);
  res.send(output)

});

router.post('/process', function(req, res, next) {
  var input=req.body.input;

  var parameters = {
    'text': input,
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
      }
    }
  }

  nlu.analyze(parameters, function(err, response) {
    if (err) {
      console.log('error:', err);
      res.send('Error Processing NLU');
    }
    else {
      console.log(JSON.stringify(response, null, 2))
      // res.send(JSON.stringify(response));
      res.send(processResponse(response))
    }

  });

});


module.exports = router;
