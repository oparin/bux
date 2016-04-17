<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/5/15
 * Time: 1:26 PM
 */

namespace Bux\Admin\MembersBundle\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;
/**
 * Class SurveyColumn
 *
 * @package Bux\Admin\MembersBundle\Grid\Column
 */
class SurveyColumn extends Column
{
    /**
     * @param array $params
     */
    public function __initialize(array $params)
    {
        parent::__initialize($params);

        // Disable the filter of the column
        $this->setFilterable(false);
        $this->setOrder(false);
    }

    /**
     * @return string
     */
    public function getType()
    {
        return 'survey';
    }
} 