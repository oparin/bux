<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/20/15
 * Time: 1:14 PM
 */

namespace Bux\AccountBundle\Resources\views\AdvertiserPanel\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;

/**
 * Class ClicksOutsideColumn
 *
 * @package Bux\AccountBundle\Resources\views\AdvertiserPanel\Grid\Column
 */
class ClicksOutsideColumn extends Column
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
        return 'clicks_outside';
    }
}