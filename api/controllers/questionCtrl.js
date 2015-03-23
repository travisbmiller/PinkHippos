var Question = require('../models/questionModel');


module.exports = {

	askQuestion: function(req, res) {
		var newQuestion = new Question(req.body);
		newQuestion.save(function(err, question) {
			
			if (err) {
				return res.status(500).json(err);
			} else {
				return res.status(200).json(question);
			}
		});
	},

	answerQuestion: function(req, res) {
		Question.findOneAndUpdate({_id: req.params.id}, req.body, function(err, question) {
			if (err) {
				console.log('replyQuestion err: ', err);
			}
			question.answer = req.body.answer;
		});
	}

}