<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 4:10 PM
 */

namespace Bux\Admin\MembersBundle\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;

/**
 * Class CountryColumn
 *
 * @package Bux\Admin\MembersBundle\Grid\Column
 */
class CountryColumn extends Column
{
    /**
     * @param array $params
     */
    public function __initialize(array $params)
    {
        parent::__initialize($params);

        // Disable the filter of the column
//        $this->setFilterable(false);
        $this->setOrder(false);
    }

    /**
     * @return string
     */
    public function getType()
    {
        return 'country';
    }
}