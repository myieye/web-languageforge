<?php

namespace models;

use models\mapper\IdReference;

use models\mapper\Id;
use models\mapper\ArrayOf;

class QuestionModelMongoMapper extends \models\mapper\MongoMapper
{
	/**
	 * @var QuestionModelMongoMapper[]
	 */
	private static $_pool = array();
	
	/**
	 * @param string $databaseName
	 * @return CommentModelMongoMapper
	 */
	public static function connect($databaseName) {
		if (!isset(static::$_pool[$databaseName])) {
			static::$_pool[$databaseName] = new QuestionModelMongoMapper($databaseName, 'questions');
		}
		return static::$_pool[$databaseName];
	}
	
}

class QuestionModel extends \models\mapper\MapperModel
{
	public function __construct($projectModel, $id = '') {
		$this->id = new Id();
		$this->textRef = new IdReference();
		$this->answers = new ArrayOf(
			ArrayOf::OBJECT,
			function() {
				return new AnswerModel();
			}
		);
		
		$databaseName = $projectModel->databaseName();
		parent::__construct(QuestionModelMongoMapper::connect($databaseName), $id);
	}	
	
	public static function remove($databaseName, $id) {
		QuestionModelMongoMapper::connect($databaseName)->remove($id);
	}
	
	public $id;
	
	public $title;
	
	/**
	 * 
	 * @var string A content description/explanation of the question being asked
	 */
	public $description;
	
	/**
	 * 
	 * @var
	 */
	public $dateCreated;
	
	/**
	 * 
	 * @var \MongoDate
	 */
	public $dateEdited;

	/**
	 * 
	 * @var Id - Id of the referring text
	 */
	public $textRef;
	
	/**
	 * @var ArrayOf<AnswerModel>
	 */
	public $answers;
	
	//public $authorDate; // TODO CP 2013-07
			
	
}

class QuestionListModel extends \models\mapper\MapperListModel
{

	public function __construct($projectModel/*, $textId*/)
	{
		// TODO Include $textId in the query CP 2013-07
		parent::__construct(
			QuestionModelMongoMapper::connect($projectModel->databaseName()),
			array('title' => array('$regex' => '')),
			array('title')
		);
	}
	
}

?>