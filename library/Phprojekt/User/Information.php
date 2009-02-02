<?php
/**
 * Convert a model into a json structure.
 * This is usually done by a controller to send data to the
 * client
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    $Id:$
 * @author     Gustavo Solt <solt@mayflower.de>
 * @package    PHProjekt
 * @subpackage Core
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */

/**
 * Convert a model into a json structure.
 * This is usally done by a controller to send data to the client.
 * The Phprojekt_Convert_Json takes care that a apporpriate structure
 * is made from the given model.
 *
 * The fields are hardcore.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @version    Release: @package_version@
 * @license    LGPL 2.1 (See LICENSE file)
 * @author     Gustavo Solt <solt@mayflower.de>
 * @package    PHProjekt
 * @subpackage Core
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */
class Phprojekt_User_Information extends EmptyIterator implements Phprojekt_ModelInformation_Interface
{
    /**
     * Return an array of field information.
     *
     * @param integer $ordering An ordering constant
     *
     * @return array
     */
    public function getFieldDefinition($ordering = Phprojekt_ModelInformation_Default::ORDERING_DEFAULT)
    {
        $converted = array();

        // username
        $data = array();
        $data['key']      = 'username';
        $data['label']    = Phprojekt::getInstance()->translate('username');
        $data['type']     = 'text';
        $data['hint']     = Phprojekt::getInstance()->translate('username');
        $data['order']    = 0;
        $data['position'] = 1;
        $data['fieldset'] = '';
        $data['range']    = array('id'   => '',
                                  'name' => '');
        $data['required'] = true;
        $data['readOnly'] = false;
        $data['tab']      = 1;

        $converted[] = $data;

        if ($ordering == Phprojekt_ModelInformation_Default::ORDERING_FORM) {
            // password
            $data = array();
            $data['key']      = 'password';
            $data['label']    = Phprojekt::getInstance()->translate('password');
            $data['type']     = 'password';
            $data['hint']     = Phprojekt::getInstance()->translate('password');
            $data['order']    = 0;
            $data['position'] = 2;
            $data['fieldset'] = '';
            $data['range']    = array('id'   => '',
                                      'name' => '');
            $data['required'] = true;
            $data['readOnly'] = false;
            $data['tab']      = 1;

            $converted[] = $data;
        }

        // firstname
        $data = array();
        $data['key']      = 'firstname';
        $data['label']    = Phprojekt::getInstance()->translate('firstname');
        $data['type']     = 'text';
        $data['hint']     = Phprojekt::getInstance()->translate('firstname');
        $data['order']    = 0;
        $data['position'] = 3;
        $data['fieldset'] = '';
        $data['range']    = array('id'   => '',
                                  'name' => '');
        $data['required'] = true;
        $data['readOnly'] = false;
        $data['tab']      = 1;

        $converted[] = $data;

        // lastname
        $data = array();
        $data['key']      = 'lastname';
        $data['label']    = Phprojekt::getInstance()->translate('lastname');
        $data['type']     = 'text';
        $data['hint']     = Phprojekt::getInstance()->translate('lastname');
        $data['order']    = 0;
        $data['position'] = 4;
        $data['fieldset'] = '';
        $data['range']    = array('id'   => '',
                                  'name' => '');
        $data['required'] = true;
        $data['readOnly'] = false;
        $data['tab']      = 1;

        $converted[] = $data;

        if ($ordering == Phprojekt_ModelInformation_Default::ORDERING_FORM) {
            // email
            $data = array();
            $data['key']      = 'email';
            $data['label']    = Phprojekt::getInstance()->translate('email');
            $data['type']     = 'text';
            $data['hint']     = Phprojekt::getInstance()->translate('email');
            $data['order']    = 0;
            $data['position'] = 5;
            $data['fieldset'] = '';
            $data['range']    = array('id'   => '',
                                      'name' => '');
            $data['required'] = true;
            $data['readOnly'] = false;
            $data['tab']      = 1;

            $converted[] = $data;

            // language
            $data = array();
            $data['key']      = 'language';
            $data['label']    = Phprojekt::getInstance()->translate('language');
            $data['type']     = 'selectbox';
            $data['hint']     = Phprojekt::getInstance()->translate('language');
            $data['order']    = 0;
            $data['position'] = 6;
            $data['fieldset'] = '';
            $data['range']    = array(array('id'   => 'es',
                                            'name' => 'Spanish'),
                                      array('id'   => 'en',
                                            'name' => 'English'),
                                      array('id'   => 'de',
                                            'name' => 'German'));
            $data['required'] = true;
            $data['readOnly'] = false;
            $data['tab']      = 1;

            $converted[] = $data;

            // timeZone
            $data = array();
            $data['key']      = 'timeZone';
            $data['label']    = Phprojekt::getInstance()->translate('timeZone');
            $data['type']     = 'selectbox';
            $data['hint']     = Phprojekt::getInstance()->translate('timeZone');
            $data['order']    = 0;
            $data['position'] = 7;
            $data['fieldset'] = '';
            $data['range'] = array();
            for ($i = -12; $i <= 12; $i++) {
                $tmp = array();
                $tmp['id'] = $i;
                $tmp['name'] = $i;
                $data['range'][] = $tmp;
            }
            $data['required'] = true;
            $data['readOnly'] = false;
            $data['tab']      = 1;

            $converted[] = $data;
        }

        // status
        $data = array();
        $data['key']      = 'status';
        $data['label']    = Phprojekt::getInstance()->translate('status');
        $data['type']     = 'selectbox';
        $data['hint']     = Phprojekt::getInstance()->translate('status');
        $data['order']    = 0;
        $data['position'] = 8;
        $data['fieldset'] = '';
        $data['range']    = array(array('id'   => 'A',
                                        'name' => Phprojekt::getInstance()->translate('Active')),
                                  array('id'   => 'I',
                                        'name' => Phprojekt::getInstance()->translate('Inactive')));
        $data['required'] = true;
        $data['readOnly'] = false;
        $data['tab']      = 1;

        $converted[] = $data;

        // admin
        $data = array();
        $data['key']      = 'admin';
        $data['label']    = Phprojekt::getInstance()->translate('admin');
        $data['type']     = 'selectbox';
        $data['hint']     = Phprojekt::getInstance()->translate('admin');
        $data['order']    = 0;
        $data['position'] = 9;
        $data['fieldset'] = '';
        $data['range']    = array(array('id'   => 0,
                                        'name' => Phprojekt::getInstance()->translate('No')),
                                  array('id'   => 1,
                                        'name' => Phprojekt::getInstance()->translate('Yes')));
        $data['required'] = false;
        $data['readOnly'] = false;
        $data['tab']      = 1;

        $converted[] = $data;

        return $converted;
    }

    /**
     * Return an array with titles to simplify things
     *
     * @param integer $ordering An ordering constant (ORDERING_DEFAULT, etc)
     *
     * @return array
     */
    public function getTitles($ordering = Phprojekt_ModelInformation_Default::ORDERING_DEFAULT)
    {
        $result = array();
        return $result;
    }
}
