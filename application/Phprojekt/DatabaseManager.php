<?php
/**
 * Database manager interfase
 *
 * LICENSE: Licensed under the terms of the PHProjekt 6 License
 *
 * @copyright  2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    CVS: $Id:
 * @author     Gustavo Solt <solt@mayflower.de>
 * @package    PHProjekt
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 */

/* Phprojekt_ActiveRecord_Abstract */
require_once PHPR_CORE_PATH . '/Phprojekt/ActiveRecord/Abstract.php';

/**
 * The class provide the stuff from the database_manager
 *
 * @copyright  2007 Mayflower GmbH (http://www.mayflower.de)
 * @package    PHProjekt
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 * @author     David Soria Parra <soria_parra@mayflower.de>
 */
class Phprojekt_DatabaseManager extends Phprojekt_ActiveRecord_Abstract
{
    /**
     * Initialize new object
     *
     * @param array $config Configuration for Zend_Db_Table
     */
    public function __construct($config)
    {
        parent::__construct($config);
    }

    /**
     * Get the sorted list of field for list
     *
     * @param string $table The table name of the module
     *
     * @return array Array with the data of the list fields
     */
    public function getFieldsForList($table)
    {
        $listFields = array('id');

        $where  = "tableName  = '" . $table . "'";
        $order  = "listPosition";
        $fields = $this->fetchAll($where, $order);
        foreach ($fields as $fieldData) {
            $listFields[] = $fieldData->tableField;
        }

        return $listFields;
    }

    /**
     * Get the sorted form fields for the form
     *
     * @param string $table The table name of the module
     *
     * @return array Array with the data of the form field
     */
    public function getFieldsForForm($table)
    {
        $formFields = array();

        $where  = "tableName  = '" . $table . "'";
        $order  = "formPosition";
        $fields = $this->fetchAll($where);
        foreach ($fields as $fieldData) {
            $formFields[$fieldData->tableField] = array(
                'type'            => $fieldData->formType,
                'tab'              => $fieldData->formTab,
                'label'           => $fieldData->formLabel,
                'tooltip'         => $fieldData->formTooltip,
                'position'       => $fieldData->formPosition,
                'columns'       => $fieldData->formColumns,
                'regexp'        => $fieldData->formRegexp,
                'range'           => $fieldData->formRange,
                'value'            => $fieldData->defaultValue,
                'isInteger'    => $fieldData->isInteger,
                'isRequired'  => $fieldData->isRequired,
                'isUnique'      => $fieldData->isUnique
            );
        }
        return $formFields;
    }
}