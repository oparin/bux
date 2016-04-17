<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/16/15
 * Time: 4:43 PM
 */

namespace Bux\AccountBundle\Resources\views\AdvertiserPanel\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;

/**
 * Class ViewsClicksColumn
 *
 * @package Bux\AccountBundle\Resources\views\AdvertiserPanel\Grid\Column
 */
class ViewsClicksColumn extends Column
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
        return 'views_click';
    }
}