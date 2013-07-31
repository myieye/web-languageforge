<?php

use models\AnswerModel;

use models\QuestionListModel;

use models\mapper\MongoStore;
use models\ProjectModel;
use models\QuestionModel;

require_once(dirname(__FILE__) . '/../TestConfig.php');
require_once(SimpleTestPath . 'autorun.php');

require_once(TestPath . 'common/MongoTestEnvironment.php');

require_once(SourcePath . "models/ProjectModel.php");
require_once(SourcePath . "models/QuestionModel.php");


class TestQuestionModel extends UnitTestCase {

	function __construct() {
		$e = new MongoTestEnvironment();
		$e->clean();
	}

	function testCRUD_Works() {
		$projectModel = new MockProjectModel();
		// List
		$list = new QuestionListModel($projectModel);
		$list->read();
		$this->assertEqual(0, $list->count);
		
		// Create
		$question = new QuestionModel($projectModel);
		$question->title = "SomeQuestion";
		$id = $question->write();
		$this->assertNotNull($id);
		$this->assertIsA($id, 'string');
		$this->assertEqual($id, $question->id->asString());
		
		// Read back
		$otherQuestion = new QuestionModel($projectModel, $id);
		$this->assertEqual($id, $otherQuestion->id->asString());
		$this->assertEqual('SomeQuestion', $otherQuestion->title);
		
		// Update
		$otherQuestion->title = 'OtherQuestion';
		$otherQuestion->write();

		// Read back
		$otherQuestion = new QuestionModel($projectModel, $id);
		$this->assertEqual('OtherQuestion', $otherQuestion->title);
		
		// List
		$list->read();
		$this->assertEqual(1, $list->count);

		// Delete
		QuestionModel::remove($projectModel->databaseName(), $id);
		
		// List
		$list->read();
		$this->assertEqual(0, $list->count);
		
	}

	function testAnswerEncode_Works() {
		$projectModel = new MockProjectModel();
		
		$question = new QuestionModel($projectModel);
		
		// Create
		$answer = new AnswerModel();
		$answer->content = 'Some Answer';
		$question->answers->append($answer);
		$id = $question->write();
		
		// The answer should have a valid id on write.
		$answer = $question->answers->data[0];
		$this->assertIsA($answer->id->id, 'string');
		$this->assertEqual(24, strlen($answer->id->id));
		
		// Read back
		$otherQuestion = new QuestionModel($projectModel, $id);
		$this->assertEqual(1, $otherQuestion->answers->count());
		$otherAnswer = $otherQuestion->answers->data[0];
		$this->assertEqual('Some Answer', $otherAnswer->content);
		$this->assertIsA($otherAnswer, 'models\AnswerModel');
		
		// The read back answer should have the same key.
		$this->assertEqual($answer->id, $otherAnswer->id);
	}

}

?>
